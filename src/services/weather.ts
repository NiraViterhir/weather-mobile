import axios from 'axios';
import { geocodeByName } from './geocoding';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

export type DailyForecast = {
  date: string;
  tempMaxC: number;
  tempMinC: number;
  precipitationChance?: number;
  weatherCode?: number;
};

/**
 * Fetch current weather for a city by coordinates using Open-Meteo Geocoding API
 */
export async function getCurrentWeather(
  lat: number,
  lon: number,
): Promise<{tempC: number; weatherCode?: number} | null> {
  const params = {
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,weather_code',
    timezone: 'auto',
  } as const;
  const {data} = await axios.get(OPEN_METEO_BASE, {params});
  if (!data?.current) {
    return null;
  }
  return {
    tempC: data.current.temperature_2m,
    weatherCode: data.current.weather_code,
  };
}

/**
 * Fetch weekly forecast by coordinates using Open-Meteo API
 */
export async function getWeeklyForecast(
  lat: number,
  lon: number,
): Promise<DailyForecast[]> {
  const params = {
    latitude: lat,
    longitude: lon,
    daily:
      'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
    forecast_days: 7,
    timezone: 'auto',
  } as const;
  const {data} = await axios.get(OPEN_METEO_BASE, {params});
  const dates: string[] = data?.daily?.time || [];
  const maxes: number[] = data?.daily?.temperature_2m_max || [];
  const mins: number[] = data?.daily?.temperature_2m_min || [];
  const precip: number[] = data?.daily?.precipitation_probability_max || [];
  const codes: number[] = data?.daily?.weather_code || [];
  return dates.map((date, i) => ({
    date,
    tempMaxC: maxes[i],
    tempMinC: mins[i],
    precipitationChance: precip[i],
    weatherCode: codes[i],
  }));
}

export type CityWeather = {
  location?: {lat: number; lon: number; name?: string; country?: string};
  current: {tempC: number; weatherCode?: number} | null;
  weekly: DailyForecast[];
};

/**
 * Resolve a city name to coordinates using Open-Meteo Geocoding API, then
 * reuse getCurrentWeather and getWeeklyForecast to fetch data.
 */
export async function getWeatherByCityName(cityName: string): Promise<CityWeather> {
  const first = await geocodeByName(cityName);
  if (!first) {
    return {current: null, weekly: []};
  }

  const lat: number = first.lat;
  const lon: number = first.lon;

  const [current, weekly] = await Promise.all([
    getCurrentWeather(lat, lon),
    getWeeklyForecast(lat, lon),
  ]);

  return {
    location: {
      lat,
      lon,
      name: first.name as string | undefined,
      country: first.country as string | undefined,
    },
    current,
    weekly,
  };
}
