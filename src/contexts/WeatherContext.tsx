import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import { WEATHER_DEFAULT_CITIES } from '@/constants/weather';
import { logger } from '@/services/logger';
import {
  fetchWeatherForCities,
  filterSnapshots,
  isComfortableWeather,
  isRainyWeather,
  loadStoredWeather,
  persistWeatherPreferences,
  persistWeatherSnapshots,
  sortSnapshots,
} from '@/services/weather';
import {
  WeatherFilterOption,
  WeatherSnapshot,
  WeatherSnapshotMap,
  WeatherSortOption,
} from '@/types/weather';

import { weatherInitialState, weatherReducer } from './weatherReducer';
import type { WeatherState } from './weatherReducer';

type WeatherContextValue = {
  state: WeatherState;
  refresh: (options?: { silent?: boolean }) => Promise<void>;
  setSort: (option: WeatherSortOption) => void;
  setFilter: (option: WeatherFilterOption) => void;
  getSnapshotByCityId: (cityId: number) => WeatherSnapshot | undefined;
  getVisibleSnapshots: () => WeatherSnapshot[];
  visibleSnapshots: WeatherSnapshot[];
  isComfortable: (snapshot: WeatherSnapshot) => boolean;
  isRainy: (snapshot: WeatherSnapshot) => boolean;
};

const WeatherContext = createContext<WeatherContextValue | null>(null);

const snapshotsToMap = (snapshots: WeatherSnapshot[]): WeatherSnapshotMap => {
  return snapshots.reduce<WeatherSnapshotMap>((acc, snapshot) => {
    acc[snapshot.city.id] = snapshot;
    return acc;
  }, {});
};

export const WeatherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, weatherInitialState);
  const hydratedRef = useRef(false);

  useEffect(() => {
    persistWeatherPreferences({ sortBy: state.sortBy, filter: state.filter }).catch((error) => {
      logger.warn('Failed to persist weather preferences', error);
    });
  }, [state.sortBy, state.filter]);

  const refresh = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;

      dispatch({ type: 'request', refreshing: silent });

      try {
        const snapshots = await fetchWeatherForCities(WEATHER_DEFAULT_CITIES, state.units);
        const fetchedAt = Date.now();

        dispatch({
          type: 'success',
          payload: {
            snapshots,
            fetchedAt,
          },
        });

        await persistWeatherSnapshots(snapshotsToMap(snapshots), fetchedAt);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error fetching weather';
        dispatch({ type: 'failure', payload: { error: message } });
        logger.error('Weather refresh failed', error);
      }
    },
    [state.units],
  );

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        const stored = await loadStoredWeather();

        if (cancelled) {
          return;
        }

        if (!hydratedRef.current) {
          dispatch({
            type: 'hydrate',
            payload: {
              snapshots: stored.snapshots,
              lastUpdated: stored.lastUpdated,
              sortBy: stored.preferences?.sortBy ?? weatherInitialState.sortBy,
              filter: stored.preferences?.filter ?? weatherInitialState.filter,
            },
          });

          hydratedRef.current = true;

          refresh({ silent: true }).catch((error) =>
            logger.error('Initial weather refresh failed', error),
          );
        }
      } catch (error) {
        logger.error('Failed to hydrate weather cache', error);
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const setSort = useCallback((option: WeatherSortOption) => {
    dispatch({ type: 'setSort', payload: option });
  }, []);

  const setFilter = useCallback((option: WeatherFilterOption) => {
    dispatch({ type: 'setFilter', payload: option });
  }, []);

  const getSnapshotByCityId = useCallback(
    (cityId: number) => {
      return state.snapshots[cityId];
    },
    [state.snapshots],
  );

  const allSnapshots = useMemo(() => Object.values(state.snapshots), [state.snapshots]);

  const visibleSnapshots = useMemo(() => {
    const filtered = filterSnapshots(allSnapshots, state.filter);
    return sortSnapshots(filtered, state.sortBy);
  }, [allSnapshots, state.filter, state.sortBy]);

  const getVisibleSnapshots = useCallback(() => visibleSnapshots, [visibleSnapshots]);

  useEffect(() => {
    if (hydratedRef.current && Object.keys(state.snapshots).length === 0) {
      refresh({ silent: true }).catch((error) => logger.error('Initial weather refresh failed', error));
    }
  }, [refresh, state.snapshots]);

  const value = useMemo<WeatherContextValue>(() => {
    return {
      state,
      refresh,
      setSort,
      setFilter,
      getSnapshotByCityId,
      getVisibleSnapshots,
      visibleSnapshots,
      isComfortable: isComfortableWeather,
      isRainy: isRainyWeather,
    };
  }, [
    getSnapshotByCityId,
    getVisibleSnapshots,
    refresh,
    setFilter,
    setSort,
    state,
    visibleSnapshots,
  ]);

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }

  return context;
};
