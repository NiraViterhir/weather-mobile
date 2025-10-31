import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

interface CurrentWeatherProps {
  loading: boolean,
  city: string | null,
  tempC: number | null,
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  return (
    <View style={styles.callout}>
      {props.loading ? (
        <ActivityIndicator/>
      ) : (
        <>
          <Text style={styles.title}>
            {props.city || 'No city name'}
          </Text>
          {props.tempC != null && (
            <Text style={styles.subtitle}>{Math.round(props.tempC)}°C</Text>
          )}
          <Text style={styles.hint}>
            Tap to view weekly forecast →
          </Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
})
