import { ActivityIndicator, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { parseLocationLabel } from "../../utils/parseLocation.ts";
import { styles } from "./CurrentWeather.styles";

interface CurrentWeatherProps {
  loading: boolean,
  city: string | null,
  tempC: number | null,
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  const [city, setCity] = useState<string | null>(props.city);
  const [district, setDistrict] = useState<string | null>(props.city);

  useEffect(() => {
    if (props.city) {
      const {city: parsedCity, rest} = parseLocationLabel(props.city);
      setCity(parsedCity);
      setDistrict(rest);
    }
  }, [props.city]);

  return (
    <View style={styles.callout}>
      {props.loading ? (
        <ActivityIndicator/>
      ) : (
        <>
          <View style={styles.cityAndTemp}>
            <Text style={styles.city}>
              {city || 'No city name'}
            </Text>
            {props.tempC != null && (
              <Text style={styles.temperature}>{Math.round(props.tempC)}°C</Text>
            )}
          </View>
          <Text style={styles.district}>
            {district || 'No district name'}
          </Text>
          <Text style={styles.hint}>
            Tap to view weekly forecast →
          </Text>
        </>
      )}
    </View>
  )
}

