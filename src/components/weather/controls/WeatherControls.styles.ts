import { StyleSheet } from 'react-native';

export const weatherControlsStyles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 12,
    width: '100%',
  },
  segmentSection: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.55,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  segmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff',
    minHeight: 36,
  },
  segmentPressed: {
    opacity: 0.9,
  },
  segmentLabel: {
    fontWeight: '600',
    fontSize: 13,
  },
  updatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  updatedText: {
    fontSize: 13,
    opacity: 0.75,
  },
});
