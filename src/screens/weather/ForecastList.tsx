import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { DailyForecast } from "../../services/weather.ts";
import ForecastItem from "./ForecastItem.tsx";

interface ForecastListProps {
  forecast: DailyForecast[] | null,
  loading: boolean,
}

export default function ForecastList(props: ForecastListProps) {
  return (
    <FlatList
      data={props.forecast || []}
      keyExtractor={item => item.date}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        !props.loading ? <Text style={styles.empty}>No forecast yet</Text> : null
      }
      renderItem={({item}) => <ForecastItem {...item} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24
  },
  empty: {
    textAlign: 'center', color: '#666', marginTop: 24
  },
});
