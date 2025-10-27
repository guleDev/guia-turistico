import React, { JSX, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { DetalhesPontoTuristicoNavigationProp } from '@/types/types';

// Tipo local para representar um ponto turístico
interface PontoTuristico {
  id: string;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

// 🔹 Pontos turísticos de exemplo (Curitiba)
const pontosDeExemplo: PontoTuristico[] = [
  {
    id: '1',
    nome: 'Jardim Botânico',
    descricao: 'Estufa icônica de vidro e jardins franceses.',
    latitude: -25.4411,
    longitude: -49.2329,
  },
  {
    id: '2',
    nome: 'Ópera de Arame',
    descricao: 'Teatro em estrutura de aço sobre um lago.',
    latitude: -25.3934,
    longitude: -49.2608,
  },
  {
    id: '3',
    nome: 'Parque Tanguá',
    descricao: 'Mirante e cascata em uma antiga pedreira.',
    latitude: -25.367,
    longitude: -49.274,
  },
];

export default function MapaScreen(): JSX.Element {
  const navigation = useNavigation<DetalhesPontoTuristicoNavigationProp>();
  const [pontos, setPontos] = useState<PontoTuristico[]>([]);

  // Região inicial do mapa (Curitiba)
  const initialRegion: Region = {
    latitude: -25.4284,
    longitude: -49.2733,
    latitudeDelta: 0.15, // zoom (quanto menor, mais aproximado)
    longitudeDelta: 0.15,
  };

  useEffect(() => {
    // Simula carregamento de pontos
    setPontos(pontosDeExemplo);
  }, []);

  // Navegar até a tela de detalhes
  const handleMarkerPress = (ponto: PontoTuristico) => {
    navigation.navigate('DetalhesPontosTuristicos', {
      id: ponto.id,
      nome: ponto.nome,
      descricao: ponto.descricao,
      latitude: ponto.latitude,
      longitude: ponto.longitude,
    } as any);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {pontos.map((ponto) => (
          <Marker
            key={ponto.id}
            coordinate={{
              latitude: ponto.latitude,
              longitude: ponto.longitude,
            }}
            title={ponto.nome}
            description={ponto.descricao}
          >
            <Callout onPress={() => handleMarkerPress(ponto)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{ponto.nome}</Text>
                <Text style={styles.calloutDescription}>{ponto.descricao}</Text>
                <Text style={styles.calloutLink}>Ver detalhes »</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#555',
  },
  calloutLink: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 6,
    textAlign: 'right',
  },
});
