/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#38bdf8';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f6f8fd',
    surface: '#ffffff',
    canvas: '#edf3ff',
    surfaceSecondary: '#f0f4ff',
    border: 'rgba(10,126,164,0.18)',
    controlInactive: 'rgba(10,126,164,0.08)',
    danger: '#ef4444',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#05070e',
    surface: '#0f172a',
    canvas: '#020409',
    surfaceSecondary: '#15223b',
    border: 'rgba(56,189,248,0.22)',
    controlInactive: 'rgba(56,189,248,0.15)',
    danger: '#fda4af',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
