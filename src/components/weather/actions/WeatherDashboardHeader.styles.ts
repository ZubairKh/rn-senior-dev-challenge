import { StyleSheet } from 'react-native';

export const weatherDashboardHeaderStyles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    gap: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  copyBlock: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.75,
  },
  subtitleAccent: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  signOutButtonPressed: {
    opacity: 0.9,
  },
  signOutLabel: {
    fontWeight: '600',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshButton: {
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(10,126,164,0.24)',
    backgroundColor: '#f8fbff',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  refreshButtonPressed: {
    opacity: 0.85,
  },
  refreshContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshLabel: {
    color: '#0a7ea4',
    fontSize: 12,
  },
  helperText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'left',
  },
  metaText: {
    fontSize: 13,
    opacity: 0.72,
  },
});
