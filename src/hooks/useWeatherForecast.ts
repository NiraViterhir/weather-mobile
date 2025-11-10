import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DailyForecast, getWeatherByCityName, getWeeklyForecast } from '../services/weather';

type UseWeatherForecastResult = {
  forecast: DailyForecast[] | null;
  loading: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  submitByCity: () => Promise<void>;
  loadByCoords: (lat: number, lon: number) => Promise<void>;
};

export function useWeatherForecast(initialQuery?: string): UseWeatherForecastResult {
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(initialQuery ?? '');

  useEffect(() => {
    if (typeof initialQuery === 'string' && initialQuery.length > 0) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const loadByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const days = await getWeeklyForecast(lat, lon);
      setForecast(days);
    } catch (e) {
      Alert.alert('Unable to fetch forecast', String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const submitByCity = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const result = await getWeatherByCityName(trimmed);
      setForecast(result.weekly || []);
    } catch (e) {
      Alert.alert('Unable to fetch weather', String(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  return {
    forecast,
    loading,
    query,
    setQuery: setQuery as Dispatch<SetStateAction<string>>,
    submitByCity,
    loadByCoords
  };
}


