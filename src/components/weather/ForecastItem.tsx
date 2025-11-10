import { Text, View } from "react-native";
import React from "react";
import { DailyForecast } from "../../services/weather.ts";
import { styles } from "./ForecastItem.styles";

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

