import React from 'react';
import { Callout, LatLng, Marker } from 'react-native-maps';
import CurrentWeather from './CurrentWeather';

type Props = {
  coordinate: LatLng;
  city: string | null;
  tempC: number | null;
  loading: boolean;
  onPressCallout: () => void;
};

export default function MapWeatherMarker({
  coordinate,
  city,
  tempC,
  loading,
  onPressCallout,
}: Props) {
  return (
    <Marker coordinate={coordinate}>
      <Callout onPress={onPressCallout}>
        <CurrentWeather city={city} loading={loading} tempC={tempC} />
      </Callout>
    </Marker>
  );
}


