import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    canvas: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        gap: 28,
    },
    decoratorLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 280,
        overflow: 'hidden',
    },
    decoratorBlob: {
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: 160,
    },
    contentWrapper: {
        width: '100%',
    },
    contentFrame: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 16,
        gap: 28,
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
    },
    cardCell: {
        flexGrow: 1,
        alignItems: 'stretch',
    },
});

export const dashboardDecoratorColors = {
    top: 'rgba(59,130,246,0.18)',
    bottom: 'rgba(14,165,233,0.14)',
};
