export type WeatherDashboardHeaderProps = {
  cityCount: number;
  lastUpdatedLabel: string;
  onRefresh: () => void;
  isRefreshing: boolean;
};
