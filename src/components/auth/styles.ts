import { Platform, StyleSheet } from 'react-native';

const PRIMARY_TINT = '#0a7ea4';

export const authStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  backButtonPressed: {
    opacity: 0.75,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#093a6180',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  header: {
    gap: 8,
    alignItems: 'flex-start',
  },
  form: {
    gap: 20,
  },
  fieldWrapper: {
    gap: 6,
  },
  helperText: {
    fontSize: 13,
    color: 'rgba(125,125,125,0.9)',
  },
  errorText: {
    fontSize: 13,
    color: '#ff6b6b',
  },
  label: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 16, default: 12 }),
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(15,23,42,0.12)',
  },
  primaryButton: {
    backgroundColor: PRIMARY_TINT,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonPressed: {
    opacity: 0.8,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  link: {
    color: PRIMARY_TINT,
    fontWeight: '600',
  },
});
