export const formatLastUpdatedLabel = (timestamp: number | null): string => {
  if (!timestamp) {
    return 'Never updated';
  }

  const formatted = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

  return `Updated ${formatted}`;
};
