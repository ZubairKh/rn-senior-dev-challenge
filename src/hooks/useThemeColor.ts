/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string },
  colorName: keyof typeof Colors.light
) {
  if (props.light) {
    return props.light;
  }

  return Colors.light[colorName];
}
