import React, { useCallback, useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Callout, LatLng, LongPressEvent, Marker, Region, } from 'react-native-maps';
import { reverseGeocodeCity } from '../../services/geocoding';
import { getCurrentWeather } from '../../services/weather';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../../navigation/types';
import CurrentWeather from "../../components/map/CurrentWeather";
import Tip from "../../components/map/Tip";
import { styles } from "./MapScreen.styles";

type Props = BottomTabScreenProps<RootTabParamList, 'Map'>;
type CityWeatherInfo = { name: string, temperature: number };

export default function MapScreen({navigation}: Props) {
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [tempC, setTempC] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onLongPress = useCallback(async (e: LongPressEvent) => {
    const newCoordinates = e.nativeEvent.coordinate;
    setLoading(true);
    try {
      const {name: cityName, temperature} = await fetchInfo(newCoordinates);
      setMarker(newCoordinates);
      setCity(cityName);
      setTempC(temperature);
    } catch (err) {
      console.error('Failed to fetch city/weather for tapped location', err);
      const message = err instanceof Error ? err.message : 'Please try again.';
      Alert.alert('Unable to load location', message);
      setMarker(newCoordinates);
      setCity('Error');
      setTempC(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInfo = async (coords: LatLng): Promise<CityWeatherInfo> => {
    try {
      const [name, current] = await Promise.all([
        reverseGeocodeCity(coords.latitude, coords.longitude),
        getCurrentWeather(coords.latitude, coords.longitude),
      ]);
      return {name: name || "error", temperature: current?.tempC ?? 0};
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      throw new Error(`Error fetching city and temperature: ${message}`);
    }
  };

  const onCalloutPress = useCallback(() => {
    if (!marker) {
      return;
    }
    navigation.navigate('Weather', {
      city: city || 'Selected location',
      lat: marker.latitude,
      lon: marker.longitude,
    });
  }, [marker, city, navigation]);

  const initialRegion: Region = useMemo(
    () => ({
      latitude: 49.1728522589072,
      longitude: 25.012891600077154,
      latitudeDelta: 3,
      longitudeDelta: 0.0421,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        onLongPress={onLongPress}>
        {marker && (
          <Marker
            coordinate={marker}
          >
            <Callout onPress={onCalloutPress}>
              <CurrentWeather city={city} loading={loading} tempC={tempC}/>
            </Callout>
          </Marker>
        )}
      </MapView>
      {!marker && (
        <Tip/>
      )}
    </View>
  );
}

 
