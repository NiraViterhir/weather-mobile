import React, { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootTabParamList } from '../../navigation/types';
import Search from "../../components/weather/Search";
import ForecastList from "../../components/weather/ForecastList";
import { styles } from "./WeatherScreen.styles";
import KeyboardSafeScreen from "../../components/common/KeyboardSafeScreen";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";

export default function WeatherScreen() {
  const route = useRoute<RouteProp<RootTabParamList, 'Weather'>>();
  const { forecast, loading, query, setQuery, submitByCity, loadByCoords } = useWeatherForecast();

  const {lat, lon, city} = route.params ?? {};

  useEffect(() => {
    if (typeof lat === 'number' && typeof lon === 'number') {
      loadByCoords(lat, lon);
    }
    if (typeof city === 'string') {
      setQuery(city);
    }
  }, [lat, lon, city, loadByCoords, setQuery]);

  return (
    <KeyboardSafeScreen
      style={styles.container}>

      <Search query={query} setQuery={setQuery} onSubmitSearch={submitByCity}/>
      <ForecastList forecast={forecast} loading={loading}/>

    </KeyboardSafeScreen>
  );
}

 
