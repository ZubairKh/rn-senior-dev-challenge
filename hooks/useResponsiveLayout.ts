import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveMetrics = {
  breakpoint: BreakpointKey;
  maxWidth: number;
  paddingHorizontal: number;
  paddingVertical: number;
  contentGap: number;
  contentAlignment: 'flex-start' | 'center';
  shouldUseScroll: boolean;
};

type Breakpoint = {
  minWidth: number;
  key: BreakpointKey;
  maxWidth: number;
  paddingHorizontal: number;
  paddingVertical: number;
  contentGap: number;
  defaultAlignment: 'flex-start' | 'center';
};

const BREAKPOINTS: Breakpoint[] = [
  {
    minWidth: 1240,
    key: 'xl',
    maxWidth: 680,
    paddingHorizontal: 96,
    paddingVertical: 72,
    contentGap: 48,
    defaultAlignment: 'center',
  },
  {
    minWidth: 1024,
    key: 'lg',
    maxWidth: 560,
    paddingHorizontal: 72,
    paddingVertical: 56,
    contentGap: 40,
    defaultAlignment: 'center',
  },
  {
    minWidth: 768,
    key: 'md',
    maxWidth: 480,
    paddingHorizontal: 56,
    paddingVertical: 48,
    contentGap: 36,
    defaultAlignment: 'center',
  },
  {
    minWidth: 600,
    key: 'sm',
    maxWidth: 420,
    paddingHorizontal: 36,
    paddingVertical: 40,
    contentGap: 28,
    defaultAlignment: 'flex-start',
  },
  {
    minWidth: 0,
    key: 'xs',
    maxWidth: 360,
    paddingHorizontal: 24,
    paddingVertical: 32,
    contentGap: 24,
    defaultAlignment: 'flex-start',
  },
];

export const useResponsiveLayout = (): ResponsiveMetrics => {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const match = BREAKPOINTS.find((breakpoint) => width >= breakpoint.minWidth) ?? BREAKPOINTS[BREAKPOINTS.length - 1];
    const isCompactHeight = height < 720;
    const shouldUseScroll = isCompactHeight || match.key === 'xs';

    return {
      breakpoint: match.key,
      maxWidth: match.maxWidth,
      paddingHorizontal: match.paddingHorizontal,
      paddingVertical: match.paddingVertical,
      contentGap: match.contentGap,
      contentAlignment: isCompactHeight ? 'flex-start' : match.defaultAlignment,
      shouldUseScroll,
    };
  }, [height, width]);
};
