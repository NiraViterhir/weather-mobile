import axios from 'axios';

const API_KEY = "AIzaSyAOK7lvPEYcqyWAQ6gVG3EZAeqbIMUSEMU";

export async function reverseGeocodeCity(
  lat: number,
  lon: number,
): Promise<string | null> {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json';
  const {data} = await axios.get(url, {
    params: {
      latlng: `${lat},${lon}`,
      key:API_KEY,
      format: 'json',
    },
  });
  const item = data?.results?.[0];
  if (!item) {
    return null;
  }
  return item.formatted_address;
}
