import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Suas telas
import { ListaPontosTuristicos, Favoritos, Mapa, Perfil } from '@/screens';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help";

          if (route.name === "Explorar") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Favoritos") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Mapa") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Explorar" component={ListaPontosTuristicos} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Mapa" component={Mapa} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarLabel: "Perfil" }} />
    </Tab.Navigator>
  );
}
