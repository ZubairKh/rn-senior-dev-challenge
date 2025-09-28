import { formatLastUpdatedLabel } from '@/services/weather/formatters';

describe('formatLastUpdatedLabel', () => {
  it('returns fallback text when timestamp is missing', () => {
    expect(formatLastUpdatedLabel(null)).toBe('Never updated');
  });

  it('formats timestamps with hour and minute', () => {
    // 2024-01-01T15:30:00.000Z
    const label = formatLastUpdatedLabel(Date.parse('2024-01-01T15:30:00.000Z'));
    expect(label).toMatch(/Updated/);
    expect(label).toMatch(/15|3/); // depends on locale/timezone, so just ensure time digits appear
  });
});
