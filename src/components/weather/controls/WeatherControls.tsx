import React, { useMemo } from 'react';
import { View } from 'react-native';

import { weatherControlsStyles } from './WeatherControls.styles';
import { WeatherControlsProps } from './WeatherControls.types';
import {
  buildFilterSegmentOptions,
  buildSortSegmentOptions,
} from './WeatherControls.utils';
import { WeatherControlsSegments } from './WeatherControlsSegments';

export const WeatherControls: React.FC<WeatherControlsProps> = ({
  sortBy,
  filter,
  onSortChange,
  onFilterChange,
}) => {
  const sortOptions = useMemo(
    () => buildSortSegmentOptions(sortBy, onSortChange),
    [sortBy, onSortChange],
  );
  const filterOptions = useMemo(
    () => buildFilterSegmentOptions(filter, onFilterChange),
    [filter, onFilterChange],
  );

  return (
    <View style={weatherControlsStyles.container}>
      <WeatherControlsSegments title="Sort by" options={sortOptions} />
      <WeatherControlsSegments title="Filter" options={filterOptions} />
    </View>
  );
};
