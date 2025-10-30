import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { IoniconsIconName }  from '@react-native-vector-icons/ionicons';

import MapScreen from './src/screens/MapScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import type { RootTabParamList } from './src/navigation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: IoniconsIconName = "bug";

            if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Weather') {
              iconName = focused ? 'cloud' : 'cloud-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Weather" component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
