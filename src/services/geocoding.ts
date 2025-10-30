import axios from 'axios';

export async function reverseGeocodeCity(
  lat: number,
  lon: number,
): Promise<string | null> {
  // Use Open-Meteo reverse geocoding to avoid requiring Google reverse geocode
  const url = 'https://geocoding-api.open-meteo.com/v1/reverse';
  const {data} = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      language: 'en',
      format: 'json',
    },
  });
  const item = data?.results?.[0];
  if (!item) {
    return null;
  }
  return item.city || item.name || item.admin1 || null;
}
