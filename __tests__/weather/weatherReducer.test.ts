import { WEATHER_DEFAULT_CITIES } from '@/constants/weather';
import { WeatherSnapshot } from '@/types/weather';
import { weatherInitialState, weatherReducer } from '@/contexts/weatherReducer';

describe('weatherReducer', () => {
  const sampleSnapshot: WeatherSnapshot = {
    city: {
      id: 123,
      name: 'Test City',
      countryCode: 'TC',
      latitude: 10,
      longitude: 20,
    },
    temperature: 18,
    temperatureFeelsLike: 16,
    humidity: 45,
    pressure: 1015,
    windSpeed: 3.5,
    conditionId: 801,
    conditionLabel: 'Cloudy',
    conditionIcon: '02d',
    sunrise: 1000,
    sunset: 2000,
    observationTime: 1500,
  };

  it('hydrates state and clears status/error', () => {
    const state = weatherReducer(weatherInitialState, {
      type: 'hydrate',
      payload: {
        snapshots: { 123: sampleSnapshot },
        lastUpdated: 42,
        sortBy: 'humidity',
        filter: 'comfortable',
      },
    });

    expect(state.status).toBe('idle');
    expect(state.error).toBeNull();
    expect(state.snapshots).toEqual({ 123: sampleSnapshot });
    expect(state.lastUpdated).toBe(42);
    expect(state.sortBy).toBe('humidity');
    expect(state.filter).toBe('comfortable');
  });

  it('sets loading state on request', () => {
    expect(
      weatherReducer(weatherInitialState, {
        type: 'request',
      }).status,
    ).toBe('loading');

    expect(
      weatherReducer(weatherInitialState, {
        type: 'request',
        refreshing: true,
      }).status,
    ).toBe('refreshing');
  });

  it('merges snapshots and records fetch time on success', () => {
    const priorState = {
      ...weatherInitialState,
      snapshots: {
        1: {
          ...sampleSnapshot,
          city: { ...sampleSnapshot.city, id: 1, name: 'Existing' },
        },
      },
    } as const;

    const updatedSnapshot = {
      ...sampleSnapshot,
      city: { ...sampleSnapshot.city, id: WEATHER_DEFAULT_CITIES[0].id },
    };

    const result = weatherReducer(priorState, {
      type: 'success',
      payload: { snapshots: [updatedSnapshot], fetchedAt: 999 },
    });

    expect(Object.values(result.snapshots)).toHaveLength(2);
    expect(result.snapshots[updatedSnapshot.city.id]).toEqual(updatedSnapshot);
    expect(result.status).toBe('idle');
    expect(result.error).toBeNull();
    expect(result.lastUpdated).toBe(999);
  });

  it('records failure message', () => {
    const result = weatherReducer(weatherInitialState, {
      type: 'failure',
      payload: { error: 'Boom' },
    });

    expect(result.status).toBe('error');
    expect(result.error).toBe('Boom');
  });

  it('updates sort and filter independently', () => {
    const sorted = weatherReducer(weatherInitialState, {
      type: 'setSort',
      payload: 'windSpeed',
    });

    expect(sorted.sortBy).toBe('windSpeed');
    expect(sorted.filter).toBe('all');

    const filtered = weatherReducer(sorted, {
      type: 'setFilter',
      payload: 'rainy',
    });

    expect(filtered.filter).toBe('rainy');
    expect(filtered.sortBy).toBe('windSpeed');
  });
});
