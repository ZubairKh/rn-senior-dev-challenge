import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { dashboardStyles } from './DashboardScreen.styles';


export function useDashboardScreenLayout() {

    const { paddingHorizontal, paddingVertical, maxWidth } = useResponsiveLayout();
    const { width: windowWidth } = useWindowDimensions();

    const containerWidth = Math.max(
        Math.min(maxWidth, windowWidth - paddingHorizontal * 2),
        0,
    );

    const scrollContentStyle = useMemo(() => {
        return [dashboardStyles.scrollContent, { paddingBottom: paddingVertical + 32 }];
    }, [paddingVertical]);

    const horizontalInset = useMemo(() => ({ paddingHorizontal }), [paddingHorizontal]);

    return {
        containerWidth,
        scrollContentStyle,
        horizontalInset,
        paddingVertical,
        maxWidth,
    };
}
