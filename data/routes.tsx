import 'react-native-gesture-handler';
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from '@data/tabs';
import { DetalhesPontoTuristico, GerenciarPontoTuristico } from '@/screens';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { PontoDetalhesProp } from '@/types/types';

// Tipagem das rotas do Stack
export type RootStackParamList = {
  Tabs: undefined;
  DetalhesPontosTuristicos?: { pontoDetalhes?: PontoDetalhesProp };
  GerenciarPonto?: { pontoDetalhes?: PontoDetalhesProp };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes(): JSX.Element {
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
          <Stack.Screen
            name="GerenciarPonto"
            component={GerenciarPontoTuristico}
            options={{ title: "Gerenciar Ponto" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
