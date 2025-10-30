import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { IoniconsIconName }  from '@react-native-vector-icons/ionicons';

import MapScreen from './src/screens/MapScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import type { RootTabParamList } from './src/navigation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabBarIconProps = { focused: boolean; color: string; size: number };

function getTabBarIconForRoute(routeName: keyof RootTabParamList) {
  return ({ focused, color, size }: TabBarIconProps) => {
    let iconName: IoniconsIconName = 'bug';

    if (routeName === 'Map') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (routeName === 'Weather') {
      iconName = focused ? 'cloud' : 'cloud-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };
}

function createScreenOptions({ route }: { route: { name: keyof RootTabParamList } }): BottomTabNavigationOptions {
  return {
    headerShown: true,
    tabBarIcon: getTabBarIconForRoute(route.name),
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
  };
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={createScreenOptions}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Weather" component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
