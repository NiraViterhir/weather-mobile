import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootTabParamList } from '../navigation/types';
import { getWeeklyForecast, DailyForecast, getWeatherByCityName } from '../services/weather';

export default function WeatherScreen() {
  const route = useRoute<RouteProp<RootTabParamList, 'Weather'>>();
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (route.params?.lat && route.params?.lon) {
      loadForecast(route.params.lat, route.params.lon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.lat, route.params?.lon]);

  const loadForecast = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const days = await getWeeklyForecast(lat, lon);
      setForecast(days);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmitSearch = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const result = await getWeatherByCityName(q);
      setForecast(result.weekly || []);
    } catch (e){
      console.error(e);
      Alert.alert('Unable to fetch weather', String(e));
    }
    finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: 'padding', android: undefined})}>
      {!route.params?.lat && !route.params?.lon ? (
        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>Search a location</Text>
          <TextInput
            placeholder="Search city or place"
            placeholderTextColor="#999"
            style={styles.searchBox}
            returnKeyType="search"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSubmitSearch}
          />
          <Text style={styles.noticeText}>
            Or go to the Map tab and tap anywhere to choose a location.
          </Text>
        </View>
      ) : null}
      <FlatList
        data={forecast || []}
        keyExtractor={item => item.date}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No forecast yet</Text> : null
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.date}>
              {new Date(item.date).toDateString()}
            </Text>
            <Text style={styles.temp}>
              {Math.round(item.tempMaxC)}° / {Math.round(item.tempMinC)}°C
            </Text>
            {item.precipitationChance != null && (
              <Text style={styles.precip}>
                Rain: {item.precipitationChance}%
              </Text>
            )}
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 12
  },
  noticeBox: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  noticeTitle: {
    fontWeight: '600', marginBottom: 4
  },
  noticeText: {
    color: '#555'
  },
  searchBox: {
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    color: '#111'
  },
  list: {
    paddingBottom: 24
  },
  empty: {
    textAlign: 'center', color: '#666', marginTop: 24
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  date: {
    fontWeight: '600', marginBottom: 6
  },
  temp: {
    fontSize: 16, marginBottom: 4
  },
  precip: {
    color: '#666'
  },
});
