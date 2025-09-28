export type WeatherDashboardHeaderProps = {
  name: string;
  cityCount: number;
  onLogout: () => void;
  isProcessingLogout: boolean;
  lastUpdatedLabel: string;
  onRefresh: () => void;
  isRefreshing: boolean;
};
