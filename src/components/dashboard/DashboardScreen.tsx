import { BlobBackdrop } from '@/components/layout/BlobBackdrop';
import { WeatherDashboardHeader } from '@/components/weather/actions';
import { WeatherCard } from '@/components/weather/card';
import { WeatherControls } from '@/components/weather/controls';
import { WeatherEmptyState } from '@/components/weather/WeatherEmptyState';
import { WeatherErrorBanner } from '@/components/weather/WeatherErrorBanner';
import { WeatherLoader } from '@/components/weather/WeatherLoader';
import { WEATHER_DEFAULT_CITIES } from '@/constants/weather';
import { useWeather } from '@/contexts/WeatherContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useWeatherGridLayout } from '@/hooks/weather/useWeatherGridLayout';
import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { dashboardDecoratorColors, dashboardStyles } from './DashboardScreen.styles';
import { useDashboardScreenLayout } from './useDashboardScreenLayout';

export const DashboardScreen: React.FC = () => {
  const canvas = useThemeColor({}, 'canvas');

  const { state, visibleSnapshots, refresh } = useWeather();
  const { status, error } = state;

  const {
    containerWidth,
    scrollContentStyle,
    horizontalInset,
    paddingVertical,
    maxWidth,
  } = useDashboardScreenLayout();

  const { gridItemStyle, cardGridStyle } = useWeatherGridLayout(containerWidth);

  const loading = status === 'loading';
  const refreshing = status === 'refreshing';
  const snapshots = visibleSnapshots;

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
            onRefresh={() => refresh({ silent: false })}
            colors={[dashboardDecoratorColors.top]}
            tintColor={dashboardDecoratorColors.top}
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
          <WeatherDashboardHeader cityCount={WEATHER_DEFAULT_CITIES.length} />
          <View
            style={[
              dashboardStyles.contentFrame,
              { maxWidth: containerWidth || maxWidth },
            ]}
          >
            <WeatherControls />

            {error ? (
              <WeatherErrorBanner
                message={error}
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
                    <WeatherCard snapshot={snapshot} />
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
