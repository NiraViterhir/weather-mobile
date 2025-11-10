import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import type { LatLng, LongPressEvent } from 'react-native-maps';
import { getCityAndCurrentWeather } from '../services/locationWeather';

type UseCityWeatherAtCoordsResult = {
  marker: LatLng | null;
  city: string | null;
  tempC: number | null;
  loading: boolean;
  onLongPress: (e: LongPressEvent) => Promise<void>;
};

export function useCityWeatherAtCoords(): UseCityWeatherAtCoordsResult {
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [tempC, setTempC] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onLongPress = useCallback(async (e: LongPressEvent) => {
    const newCoordinates = e.nativeEvent.coordinate;
    setLoading(true);
    try {
      const { name, temperature } = await getCityAndCurrentWeather(
        newCoordinates.latitude,
        newCoordinates.longitude,
      );
      setMarker(newCoordinates);
      setCity(name);
      setTempC(temperature);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Please try again.';
      Alert.alert('Unable to load location', message);
      setMarker(newCoordinates);
      setCity('Error');
      setTempC(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { marker, city, tempC, loading, onLongPress };
}


