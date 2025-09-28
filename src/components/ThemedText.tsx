import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  type?: 'default' | 'defaultSemiBold' | 'title' | 'subtitle' | 'link';
};

const TYPE_STYLES = {
  default: { fontSize: 16, color: '#11181C' },
  defaultSemiBold: { fontSize: 16, fontWeight: '600', color: '#11181C' },
  title: { fontSize: 28, fontWeight: '700', color: '#11181C' },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#11181C' },
  link: { fontSize: 16, fontWeight: '600', color: '#0a7ea4' },
} as const;

export function ThemedText({ style, lightColor, type = 'default', ...otherProps }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor }, 'text');
  return <Text style={[TYPE_STYLES[type], { color }, style]} {...otherProps} />;
}
