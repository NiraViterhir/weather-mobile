import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../../navigation/types';
import Tip from "../../components/map/Tip";
import { styles } from "./MapScreen.styles";
import { useCityWeatherAtCoords } from "../../hooks/useCityWeatherAtCoords";
import MapWeatherMarker from "../../components/map/MapWeatherMarker";
import { DEFAULT_MAP_REGION } from "../../config/map";
import type { Region } from 'react-native-maps';

type Props = BottomTabScreenProps<RootTabParamList, 'Map'>;

export default function MapScreen({navigation}: Props) {
  const { marker, city, tempC, loading, onLongPress } = useCityWeatherAtCoords();

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

  const initialRegion: Region = useMemo(() => DEFAULT_MAP_REGION, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        onLongPress={onLongPress}>
        {marker && (
          <MapWeatherMarker
            coordinate={marker}
            city={city}
            tempC={tempC}
            loading={loading}
            onPressCallout={onCalloutPress}
          />
        )}
      </MapView>
      {!marker && (
        <Tip/>
      )}
    </View>
  );
}

 
