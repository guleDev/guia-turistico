import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DetalhesPontoTuristico } from '@screens/screens';
import Tabs from '@data/tabs';
import { FavoritesProvider } from '@/context/FavoritesContext';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalhesPontosTuristicos"
            component={DetalhesPontoTuristico}
            options={{ title: 'Detalhes do Ponto Turístico' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
