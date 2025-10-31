import axios from 'axios';

const API_KEY = "AIzaSyAOK7lvPEYcqyWAQ6gVG3EZAeqbIMUSEMU";
const GOOGLE_MAPS_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export type GeocodeResult = {
  lat: number;
  lon: number;
  name?: string;
  country?: string;
};

export async function reverseGeocodeCity(
  lat: number,
  lon: number,
): Promise<string | null> {
  const {data} = await axios.get(GOOGLE_MAPS_GEOCODE_URL, {
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

export async function geocodeByName(query: string): Promise<GeocodeResult | null> {
  const {data} = await axios.get(GOOGLE_MAPS_GEOCODE_URL, {
    params: {
      address: query,
      key: API_KEY,
    },
  });
  const item = data?.results?.[0];
  if (!item) return null;

  const location = item.geometry?.location;
  if (!location) return null;

  let country: string | undefined;
  let locality: string | undefined;
  const components: Array<{ long_name: string; short_name: string; types: string[] }> =
    item.address_components || [];
  for (const c of components) {
    if (c.types.includes('country')) country = c.long_name;
    if (c.types.includes('locality') || c.types.includes('administrative_area_level_1')) {
      locality = c.long_name;
    }
  }

  return {
    lat: location.lat,
    lon: location.lng,
    name: locality ?? item.formatted_address,
    country,
  };
}
