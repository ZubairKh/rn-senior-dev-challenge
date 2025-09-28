import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { WeatherCard } from '@/components/weather/card';
import { WeatherControls } from '@/components/weather/controls';
import { WeatherDashboardHeader } from '@/components/weather/dashboard';
import { WeatherEmptyState } from '@/components/weather/WeatherEmptyState';
import { WeatherErrorBanner } from '@/components/weather/WeatherErrorBanner';
import { WeatherLoader } from '@/components/weather/WeatherLoader';
import { ROUTES } from '@/constants/routes';
import { WEATHER_DEFAULT_CITIES } from '@/constants/weather';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/contexts/WeatherContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useWeatherGridLayout } from '@/hooks/weather/useWeatherGridLayout';
import { logger } from '@/services/logger';

export default function WeatherDashboardScreen() {
  const router = useRouter();
  const {
    state: { user, isProcessing },
    logout,
  } = useAuth();
  const { state, refresh, setFilter, setSort, visibleSnapshots, isComfortable, isRainy } =
    useWeather();
  const { paddingHorizontal, paddingVertical, maxWidth } = useResponsiveLayout();
  const { width: windowWidth } = useWindowDimensions();

  const snapshots = visibleSnapshots;
  const refreshing = state.status === 'refreshing';
  const loading = state.status === 'loading';

  const handleRefresh = () => {
    refresh({ silent: true }).catch((error) => {
      logger.warn('Weather refresh failed', error);
    });
  };

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.auth.login);
  };

  const canvas = useThemeColor({}, 'canvas');
  const containerWidth = Math.max(
    Math.min(maxWidth, windowWidth - paddingHorizontal * 2),
    0,
  );
  const { gridItemStyle, cardGridStyle } = useWeatherGridLayout(containerWidth);
  const scrollContentStyle = useMemo(() => {
    return [
      styles.scrollContent,
      {
        paddingBottom: paddingVertical + 32,
      },
    ];
  }, [paddingVertical]);

  const horizontalInset = useMemo(() => ({ paddingHorizontal }), [paddingHorizontal]);

  const lastUpdatedLabel = useMemo(() => {
    if (!state.lastUpdated) {
      return 'Never updated';
    }

    const formatted = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(state.lastUpdated));

    return `Updated ${formatted}`;
  }, [state.lastUpdated]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: canvas }]}>
      <ThemedView
        style={[styles.canvas, { backgroundColor: canvas }]}
        lightColor={canvas}
      >
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#0a7ea4"
            />
          }
        >
          <View
            style={[
              styles.contentWrapper,
              horizontalInset,
              { paddingTop: paddingVertical },
            ]}
          >
            <WeatherDashboardHeader
              name={user?.email?.split('@')[0] ?? 'there'}
              cityCount={WEATHER_DEFAULT_CITIES.length}
              isProcessingLogout={isProcessing}
              onLogout={handleLogout}
              lastUpdatedLabel={lastUpdatedLabel}
              onRefresh={handleRefresh}
              isRefreshing={refreshing}
            />
            <View style={[styles.contentFrame, { maxWidth: containerWidth || maxWidth }]}>
              <WeatherControls
                sortBy={state.sortBy}
                filter={state.filter}
                onSortChange={setSort}
                onFilterChange={setFilter}
              />

              {state.error ? (
                <WeatherErrorBanner
                  message={state.error}
                  helper="Pull to refresh or tap Refresh above."
                />
              ) : null}

              {loading && snapshots.length === 0 ? (
                <WeatherLoader />
              ) : snapshots.length === 0 ? (
                <WeatherEmptyState message="Adjust your filters or refresh to fetch the latest conditions." />
              ) : (
                <View style={[styles.cardGrid, cardGridStyle]}>
                  {snapshots.map((snapshot) => (
                    <View key={snapshot.city.id} style={[styles.cardCell, gridItemStyle]}>
                      <WeatherCard
                        snapshot={snapshot}
                        isComfortable={isComfortable(snapshot)}
                        isRainy={isRainy(snapshot)}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 28,
  },
  contentWrapper: {
    width: '100%',
  },
  contentFrame: {
    width: '100%',
    marginTop: 16,
    alignSelf: 'center',
    gap: 28,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  cardCell: {
    flexGrow: 1,
    alignItems: 'stretch',
  },
});
