import { ThemedText } from '@/components/ThemedText';

import { getHealthGuideMeta } from '@/constants/weather';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

type WeatherCardHealthGuideProps = {
  text: string;
};

export const WeatherCardHealthGuide: React.FC<WeatherCardHealthGuideProps> = ({
  text,
}) => {
  const primary = useThemeColor({}, 'tint');
  const { color } = getHealthGuideMeta(text, primary);
  return <ThemedText style={{ fontSize: 13, color, marginTop: 4 }}>{text}</ThemedText>;
};
