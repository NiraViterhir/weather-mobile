import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DailyForecast } from "../../services/weather.ts";

export default function ForecastItem(item: DailyForecast) {
  return (
    <View style={styles.card}>
      <View style={styles.dateAndTemp}>
        <Text style={styles.date}>
          {new Date(item.date).toDateString()}
        </Text>
        <Text style={styles.temp}>
          {Math.round(item.tempMaxC)}° / {Math.round(item.tempMinC)}°C
        </Text>
      </View>
      {item.precipitationChance != null && (
        <Text style={styles.precip}>
          Rain: {item.precipitationChance}%
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  dateAndTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

