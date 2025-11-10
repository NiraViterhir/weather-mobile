import React, { useCallback, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootTabParamList } from '../../navigation/types';
import { DailyForecast, getWeatherByCityName, getWeeklyForecast } from '../../services/weather';
import Search from "../../components/weather/Search";
import ForecastList from "../../components/weather/ForecastList";
import { styles } from "./WeatherScreen.styles";

export default function WeatherScreen() {
  const route = useRoute<RouteProp<RootTabParamList, 'Weather'>>();
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const loadForecast = useCallback(async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const days = await getWeeklyForecast(latitude, longitude);
      setForecast(days);
    } finally {
      setLoading(false);
    }
  }, []);

  const {lat, lon, city} = route.params ?? {};

  useEffect(() => {
    if (typeof lat === 'number' && typeof lon === 'number') {
      loadForecast(lat, lon);
    }
    if (typeof city === 'string') {
      setQuery(city);
    }
  }, [lat, lon, city, loadForecast]);

  const onSubmitSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const result = await getWeatherByCityName(q);
      setForecast(result.weekly || []);
    } catch (e) {
      console.error(e);
      Alert.alert('Unable to fetch weather', String(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: 'padding', android: undefined})}>

      <Search query={query} setQuery={setQuery} onSubmitSearch={onSubmitSearch}/>
      <ForecastList forecast={forecast} loading={loading}/>

    </KeyboardAvoidingView>
  );
}

 
