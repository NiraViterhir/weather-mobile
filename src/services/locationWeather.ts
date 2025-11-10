import { reverseGeocodeCity } from './geocoding';
import { getCurrentWeather } from './weather';

export type CityWeatherInfo = { name: string; temperature: number };

export async function getCityAndCurrentWeather(
  lat: number,
  lon: number,
): Promise<CityWeatherInfo> {
  const [name, current] = await Promise.all([
    reverseGeocodeCity(lat, lon),
    getCurrentWeather(lat, lon),
  ]);
  if (!current) {
    return { name: name || 'Unknown', temperature: 0 };
  }
  return { name: name || 'Unknown', temperature: current.tempC };
}


