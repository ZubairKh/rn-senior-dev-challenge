import { StyleSheet } from 'react-native';

export const weatherCardStyles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    gap: 20,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#0a7ea422',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  city: {
    fontSize: 18,
    fontWeight: '700',
  },
  country: {
    opacity: 0.65,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 48,
  },
  feelsLike: {
    marginTop: 4,
    opacity: 0.7,
    lineHeight: 20,
  },
  iconWrapper: {
    width: 92,
    height: 92,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  icon: {
    width: 76,
    height: 76,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  conditionText: {
    textTransform: 'capitalize',
    fontWeight: '600',
    opacity: 0.85,
  },
});
