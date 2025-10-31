import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, LatLng, MapPressEvent, Marker, Region, } from 'react-native-maps';
import { reverseGeocodeCity } from '../services/geocoding';
import { getCurrentWeather } from '../services/weather';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<RootTabParamList, 'Map'>;
type CityWeatherInfo = { name: string, temperature: number };

export default function MapScreen({navigation}: Props) {
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [tempC, setTempC] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onPress = useCallback(async (e: MapPressEvent) => {
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
        onPress={onPress}>
        {marker && (
          <Marker
            coordinate={marker}
          >
            <Callout onPress={onCalloutPress}>
              <View style={styles.callout}>
                {loading ? (
                  <ActivityIndicator/>
                ) : (
                  <>
                    <Text style={styles.title}>
                      {city || 'Tap marker to load'}
                    </Text>
                    {tempC != null && (
                      <Text style={styles.subtitle}>{Math.round(tempC)}°C</Text>
                    )}
                    <Text style={styles.hint}>
                      Tap to view weekly forecast →
                    </Text>
                  </>
                )}
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      {!marker && (
        <View style={styles.tip}>
          <Text style={styles.tipText}>
            Tap anywhere to drop a marker
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  callout: {
    minHeight: 120,
    maxWidth: 220,
    padding: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666',
  },
  tip: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tipText: {
    color: 'white',
  },
});
