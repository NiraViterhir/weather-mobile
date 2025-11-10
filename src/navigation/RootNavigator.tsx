import React from 'react';
import { createBottomTabNavigator, type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

import MapScreen from '../screens/map/MapScreen';
import WeatherScreen from '../screens/weather/WeatherScreen';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabBarIconProps = { focused: boolean; color: string; size: number };

function getTabBarIconForRoute(routeName: keyof RootTabParamList) {
  return ({ focused, color, size: _size }: TabBarIconProps) => {
    let iconName: IoniconsIconName = 'bug';

    if (routeName === 'Map') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (routeName === 'Weather') {
      iconName = focused ? 'cloud' : 'cloud-outline';
    }

    return <Ionicons name={iconName} size={29} color={color} />;
  };
}

function createScreenOptions({ route }: { route: { name: keyof RootTabParamList } }): BottomTabNavigationOptions {
  return {
    headerShown: true,
    tabBarIcon: getTabBarIconForRoute(route.name),
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
    tabBarShowLabel: false,
  };
}

export default function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
    </Tab.Navigator>
  );
}


