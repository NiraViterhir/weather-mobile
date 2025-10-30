import axios from 'axios';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

export type DailyForecast = {
  date: string;
  tempMaxC: number;
  tempMinC: number;
  precipitationChance?: number;
  weatherCode?: number;
};

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
