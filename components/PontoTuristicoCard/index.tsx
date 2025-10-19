import React from 'react';
import { View, Text, Image } from 'react-native';

import { PontoTuristicoCardProps, RootStackParamList } from '@types';
import { styles } from './PontoTuristicoCard.style';
import Button from '@components/Button';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function PontoTuristicoCard(props: PontoTuristicoCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{props.nome}</Text>
      <View style={styles.descricao_imagem}>
        <Text style={styles.descricao}>{props.descricao}</Text>
        <Image source={{ uri: props.imagem }} style={styles.imagem} resizeMode='cover'/>
      </View>
      <Button action={() => navigation.navigate('DetalhesPontosTuristicos', { id: props.id })}>Explore mais desse lugar</Button>
    </View>
  );
}
