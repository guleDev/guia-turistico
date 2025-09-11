import React from 'react';
import { View, Text } from 'react-native';

import { PontoTuristicoCardProps } from '../../data/types';
import { styles } from './PontoTuristicoCard.style';

export default function PontoTuristicoCard(props: PontoTuristicoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{props.nome}</Text>
      <Text style={styles.descricao}>{props.descricao}</Text>
    </View>
  );
}


