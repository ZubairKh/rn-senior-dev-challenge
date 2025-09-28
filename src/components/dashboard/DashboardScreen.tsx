import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, View, useWindowDimensions } from 'react-native';

import { BlobBackdrop } from '@/components/layout/BlobBackdrop';
import { WeatherCard } from '@/components/weather/card';
import { WeatherControls } from '@/components/weather/controls';
import { WeatherDashboardHeader } from '@/components/weather/dashboard';
import { WeatherEmptyState } from '@/components/weather/WeatherEmptyState';
import { WeatherErrorBanner } from '@/components/weather/WeatherErrorBanner';
import { WeatherLoader } from '@/components/weather/WeatherLoader';
import { WEATHER_DEFAULT_CITIES } from '@/constants/weather';
import { useWeather } from '@/contexts/WeatherContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useWeatherGridLayout } from '@/hooks/weather/useWeatherGridLayout';
import { logger } from '@/services/logger';
import { formatLastUpdatedLabel } from '@/services/weather/formatters';
import { dashboardDecoratorColors, dashboardStyles } from './DashboardScreen.styles';

export type DashboardScreenProps = {
  userDisplayName: string;
  isProcessingLogout: boolean;
  onLogout: () => void;
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  userDisplayName,
  isProcessingLogout,
  onLogout,
}) => {
  const { state, refresh, setFilter, setSort, visibleSnapshots, isComfortable, isRainy } =
    useWeather();
  const { paddingHorizontal, paddingVertical, maxWidth } = useResponsiveLayout();
  const { width: windowWidth } = useWindowDimensions();

  const canvas = useThemeColor({}, 'canvas');
  const handleRefresh = () => {
    refresh({ silent: true }).catch((error) => {
      logger.warn('Weather refresh failed', error);
    });
  };

  const lastUpdatedLabel = useMemo(
    () => formatLastUpdatedLabel(state.lastUpdated ?? null),
    [state.lastUpdated],
  );

  const refreshing = state.status === 'refreshing';
  const loading = state.status === 'loading';
  const snapshots = visibleSnapshots;

  const containerWidth = Math.max(
    Math.min(maxWidth, windowWidth - paddingHorizontal * 2),
    0,
  );
  const { gridItemStyle, cardGridStyle } = useWeatherGridLayout(containerWidth);

  const scrollContentStyle = useMemo(() => {
    return [dashboardStyles.scrollContent, { paddingBottom: paddingVertical + 32 }];
  }, [paddingVertical]);

  const horizontalInset = useMemo(() => ({ paddingHorizontal }), [paddingHorizontal]);

  return (
    <BlobBackdrop
      style={[dashboardStyles.canvas, { backgroundColor: canvas }]}
      topColor={dashboardDecoratorColors.top}
      bottomColor={dashboardDecoratorColors.bottom}
    >
      <ScrollView
        style={dashboardStyles.scrollView}
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
            dashboardStyles.contentWrapper,
            horizontalInset,
            { paddingTop: paddingVertical },
          ]}
        >
          <WeatherDashboardHeader
            name={userDisplayName}
            cityCount={WEATHER_DEFAULT_CITIES.length}
            isProcessingLogout={isProcessingLogout}
            onLogout={onLogout}
            lastUpdatedLabel={lastUpdatedLabel}
            onRefresh={handleRefresh}
            isRefreshing={refreshing}
          />
          <View
            style={[
              dashboardStyles.contentFrame,
              { maxWidth: containerWidth || maxWidth },
            ]}
          >
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
              <View style={[dashboardStyles.cardGrid, cardGridStyle]}>
                {snapshots.map((snapshot) => (
                  <View
                    key={snapshot.city.id}
                    style={[dashboardStyles.cardCell, gridItemStyle]}
                  >
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
    </BlobBackdrop>
  );
};
