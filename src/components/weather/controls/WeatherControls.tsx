import React, { useMemo } from 'react';
import { View } from 'react-native';

import { useWeather } from '@/contexts/WeatherContext';
import { weatherControlsStyles } from './WeatherControls.styles';
import {
  buildFilterSegmentOptions,
  buildSortSegmentOptions,
} from './WeatherControls.utils';
import { WeatherControlsSegments } from './WeatherControlsSegments';

export const WeatherControls: React.FC = () => {
  const { state, setSort, setFilter } = useWeather();
  const sortOptions = useMemo(
    () => buildSortSegmentOptions(state.sortBy, setSort),
    [state.sortBy, setSort],
  );
  const filterOptions = useMemo(
    () => buildFilterSegmentOptions(state.filter, setFilter),
    [state.filter, setFilter],
  );

  return (
    <View style={weatherControlsStyles.container}>
      <WeatherControlsSegments title="Sort by" options={sortOptions} />
      <WeatherControlsSegments title="Filter" options={filterOptions} />
    </View>
  );
};
