import { FlatList, Text } from "react-native";
import React from "react";
import { DailyForecast } from "../../services/weather.ts";
import ForecastItem from "./ForecastItem.tsx";
import { styles } from "./ForecastList.styles";

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

