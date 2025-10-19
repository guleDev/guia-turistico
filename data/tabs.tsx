import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Suas telas
import { ListaPontosTuristicos } from '@screens/screens';
import FavoritosScreen from '@/screens/Favoritos';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2a9d8f',
        tabBarInactiveTintColor: '#8d99ae',
        tabBarStyle: {
          backgroundColor: '#f8f9fa',
          borderTopWidth: 0.3,
          height: 60,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Pontos') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          else iconName = 'ellipse-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Pontos" component={ListaPontosTuristicos} />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
    </Tab.Navigator>
  );
}
