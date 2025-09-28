import { WEATHER_FILTER_OPTIONS, WEATHER_SORT_OPTIONS } from '@/constants/weather';
import { WeatherFilterOption, WeatherSortOption } from '@/types/weather';

import { WeatherControlsSegmentOption } from './WeatherControls.types';

const SORT_OPTION_CONFIG: Record<WeatherSortOption, { label: string; icon: string }> = {
  name: { label: 'Name', icon: 'map-pin' },
  temperature: { label: 'Temp', icon: 'thermometer' },
  humidity: { label: 'Humidity', icon: 'droplet' },
  windSpeed: { label: 'Wind', icon: 'wind' },
};

const FILTER_OPTION_CONFIG: Record<WeatherFilterOption, { label: string; icon?: string }> = {
  all: { label: 'All' },
  comfortable: { label: 'Comfortable', icon: 'sun' },
  rainy: { label: 'Rainy', icon: 'cloud-rain' },
};

export const buildSortSegmentOptions = (
  selected: WeatherSortOption,
  onSelect: (option: WeatherSortOption) => void,
): WeatherControlsSegmentOption[] =>
  WEATHER_SORT_OPTIONS.map((option) => ({
    key: option,
    label: SORT_OPTION_CONFIG[option].label,
    icon: SORT_OPTION_CONFIG[option].icon,
    active: selected === option,
    onPress: () => onSelect(option),
  }));

export const buildFilterSegmentOptions = (
  selected: WeatherFilterOption,
  onSelect: (option: WeatherFilterOption) => void,
): WeatherControlsSegmentOption[] =>
  WEATHER_FILTER_OPTIONS.map((option) => ({
    key: option,
    label: FILTER_OPTION_CONFIG[option].label,
    icon: FILTER_OPTION_CONFIG[option].icon,
    active: selected === option,
    onPress: () => onSelect(option),
  }));
