import { useMemo } from 'react';
import { ViewStyle } from 'react-native';

type WeatherGridLayout = {
  numColumns: number;
  gridItemStyle: ViewStyle;
  cardGridStyle: ViewStyle;
};

const getColumnCount = (maxWidth: number): number => {
  if (maxWidth >= 840) {
    return 3;
  }

  if (maxWidth >= 600) {
    return 2;
  }

  return 1;
};

export const calculateWeatherGridLayout = (availableWidth: number): WeatherGridLayout => {
  const clampedWidth = Math.max(availableWidth, 0);
  const numColumns = getColumnCount(clampedWidth);
  const columnGap = numColumns === 3 ? 24 : numColumns === 2 ? 28 : 0;
  const rowGap = numColumns > 1 ? 24 : 16;

  let gridItemStyle: ViewStyle;

  if (numColumns === 1) {
    gridItemStyle = {
      flexBasis: clampedWidth,
      maxWidth: clampedWidth,
      width: '100%',
    };
  } else {
    const contentWidth = clampedWidth - columnGap * (numColumns - 1);
    const minCardWidth = numColumns === 2 ? 320 : 280;
    const cardWidth = Math.max(minCardWidth, contentWidth / numColumns);

    gridItemStyle = {
      flexBasis: cardWidth,
      maxWidth: cardWidth,
      width: cardWidth,
    };
  }

  const cardGridStyle: ViewStyle = {
    columnGap,
    rowGap,
    justifyContent: numColumns > 1 ? 'flex-start' : 'center',
    width: '100%',
  };

  return {
    numColumns,
    gridItemStyle,
    cardGridStyle,
  };
};

export const useWeatherGridLayout = (availableWidth: number): WeatherGridLayout => {
  return useMemo(() => calculateWeatherGridLayout(availableWidth), [availableWidth]);
};

export type { WeatherGridLayout };
