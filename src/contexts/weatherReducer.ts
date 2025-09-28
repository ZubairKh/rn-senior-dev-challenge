import { WEATHER_DEFAULT_CITIES, WEATHER_DEFAULT_UNITS } from '@/constants/weather';
import {
  WeatherFilterOption,
  WeatherSnapshot,
  WeatherSnapshotMap,
  WeatherSortOption,
  WeatherUnits,
} from '@/types/weather';

export type WeatherStatus = 'idle' | 'loading' | 'refreshing' | 'error';

type WeatherState = {
  cities: typeof WEATHER_DEFAULT_CITIES;
  units: WeatherUnits;
  snapshots: WeatherSnapshotMap;
  status: WeatherStatus;
  error: string | null;
  sortBy: WeatherSortOption;
  filter: WeatherFilterOption;
  lastUpdated: number | null;
};

export type WeatherAction =
  | { type: 'hydrate'; payload: Partial<Omit<WeatherState, 'status' | 'cities' | 'units'>> }
  | { type: 'request'; refreshing?: boolean }
  | { type: 'success'; payload: { snapshots: WeatherSnapshot[]; fetchedAt: number } }
  | { type: 'failure'; payload: { error: string } }
  | { type: 'setSort'; payload: WeatherSortOption }
  | { type: 'setFilter'; payload: WeatherFilterOption };

export const weatherInitialState: WeatherState = {
  cities: WEATHER_DEFAULT_CITIES,
  units: WEATHER_DEFAULT_UNITS,
  snapshots: {},
  status: 'idle',
  error: null,
  sortBy: 'name',
  filter: 'all',
  lastUpdated: null,
};

export const weatherReducer = (state: WeatherState, action: WeatherAction): WeatherState => {
  switch (action.type) {
    case 'hydrate': {
      return {
        ...state,
        ...action.payload,
        status: 'idle',
        error: null,
      };
    }
    case 'request': {
      return {
        ...state,
        status: action.refreshing ? 'refreshing' : 'loading',
        error: null,
      };
    }
    case 'success': {
      const map = { ...state.snapshots };
      action.payload.snapshots.forEach((snapshot) => {
        map[snapshot.city.id] = snapshot;
      });

      return {
        ...state,
        snapshots: map,
        status: 'idle',
        error: null,
        lastUpdated: action.payload.fetchedAt,
      };
    }
    case 'failure': {
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    }
    case 'setSort': {
      return {
        ...state,
        sortBy: action.payload,
      };
    }
    case 'setFilter': {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

export type { WeatherState };
