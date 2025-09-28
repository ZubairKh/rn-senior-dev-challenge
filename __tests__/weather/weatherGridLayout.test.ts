import { calculateWeatherGridLayout } from '@/hooks/weather/useWeatherGridLayout';

describe('calculateWeatherGridLayout', () => {
  it('returns single column layout for narrow widths', () => {
    const layout = calculateWeatherGridLayout(320);

    expect(layout.numColumns).toBe(1);
    expect(layout.gridItemStyle.width).toBe('100%');
    expect(layout.cardGridStyle.columnGap).toBe(0);
  });

  it('uses two columns for medium widths', () => {
    const layout = calculateWeatherGridLayout(700);

    expect(layout.numColumns).toBe(2);
    expect(layout.cardGridStyle.columnGap).toBe(28);
    expect(layout.gridItemStyle.maxWidth).toBeGreaterThanOrEqual(320);
  });

  it('uses three columns for large widths', () => {
    const layout = calculateWeatherGridLayout(1000);

    expect(layout.numColumns).toBe(3);
    expect(layout.cardGridStyle.columnGap).toBe(24);
    expect(layout.gridItemStyle.maxWidth).toBeGreaterThan(0);
  });

  it('clamps negative widths to zero', () => {
    const layout = calculateWeatherGridLayout(-100);

    expect(layout.numColumns).toBe(1);
    expect(layout.gridItemStyle.flexBasis).toBe(0);
  });
});
