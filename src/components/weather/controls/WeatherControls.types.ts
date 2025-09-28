import { WeatherFilterOption, WeatherSortOption } from '@/types/weather';

export type WeatherControlsStatus = 'idle' | 'loading' | 'refreshing' | 'error';

export type WeatherControlsProps = {
  sortBy: WeatherSortOption;
  filter: WeatherFilterOption;
  onSortChange: (option: WeatherSortOption) => void;
  onFilterChange: (option: WeatherFilterOption) => void;
};

export type WeatherControlsSegmentOption = {
  key: string;
  label: string;
  icon?: string;
  active: boolean;
  onPress: () => void;
};

export type WeatherControlsSegmentsProps = {
  title: string;
  options: WeatherControlsSegmentOption[];
};
