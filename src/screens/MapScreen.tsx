import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, {
  Marker,
  Callout,
  Region,
  LongPressEvent,
} from 'react-native-maps';
import { reverseGeocodeCity } from '../services/geocoding';
import { getCurrentWeather } from '../services/weather';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<RootTabParamList, 'Map'>;

export default function MapScreen({navigation}: Props) {
  const [marker, setMarker] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [tempC, setTempC] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const onLongPress = useCallback((e: LongPressEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarker({lat: latitude, lon: longitude});
    setCity(null);
    setTempC(null);
  }, []);

  const fetchInfo = useCallback(async () => {
    if (!marker) {
      return;
    }
    setLoading(true);
    try {
      const [name, current] = await Promise.all([
        reverseGeocodeCity(marker.lat, marker.lon),
        getCurrentWeather(marker.lat, marker.lon),
      ]);
      setCity(name || 'Unknown city');
      setTempC(current?.tempC ?? null);
    } finally {
      setLoading(false);
    }
  }, [marker]);

  const onCalloutPress = useCallback(() => {
    if (!marker) {
      return;
    }
    navigation.navigate('Weather', {
      city: city || 'Selected location',
      lat: marker.lat,
      lon: marker.lon,
    });
  }, [marker, city, navigation]);

  const initialRegion: Region = useMemo(
    () => ({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
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
            coordinate={{latitude: marker.lat, longitude: marker.lon}}
            onPress={fetchInfo}>
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
            Long-press anywhere to drop a marker
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
