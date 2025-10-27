import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/context/FavoritesContext';
import api from '@/services/api';
import { styles } from './DetalhesPontoTuristico.style';

// Types
import {
  DetalhesPontoTuristicoNavigationProp,
  ApiResponseItem,
  PontoDetalhesProp,
} from '@/types/types';
import Button from '@/components/Button';

const DetalhesPontoTuristico: React.FC = () => {
  const route = useRoute<RouteProp<{ params: PontoDetalhesProp }, 'params'>>();
  const navigation = useNavigation<DetalhesPontoTuristicoNavigationProp>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { id } = route.params;

  const [detalhes, setDetalhes] = useState<PontoDetalhesProp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await api.get<ApiResponseItem>(`/posts/${id}`);
        const item = response.data;

        const dadosAdaptados: PontoDetalhesProp = {
          id: String(item.id),
          nome: item.title,
          descricao: item.body,
          detalhesCompletos: `Mais informações sobre o ponto turístico "${item.title}".`,
          imagem: `https://picsum.photos/id/${item.id % 100}/600/400`, // imagem maior
        };

        setDetalhes(dadosAdaptados);
      } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        setError('Não foi possível carregar os detalhes do ponto turístico.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetalhes();
  }, [id]);

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  const favoriteIconName = isFavorite(id) ? 'heart' : 'heart-outline';
  const favoriteIconColor = isFavorite(id) ? 'red' : 'gray';

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !detalhes) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || 'Detalhes não encontrados.'}</Text>
        <Button action={() => navigation.goBack()}>Voltar</Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.contentContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>{detalhes.nome}</Text>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Ionicons name={favoriteIconName} size={30} color={favoriteIconColor} />
          </TouchableOpacity>
        </View>

        {/* Imagem */}
        {detalhes.imagem && (
          <Image
            source={{ uri: detalhes.imagem }}
            style={styles.imagem}
            resizeMode="cover"
          />
        )}

        {/* Conteúdo */}
        <Text style={styles.detailText}>ID: {detalhes.id}</Text>
        <Text style={styles.descriptionText}>{detalhes.descricao}</Text>
        <Text style={styles.extraDetails}>{detalhes.detalhesCompletos}</Text>

        <View style={styles.buttonContainer}>
        <Button action={() => navigation.goBack()}>Voltar para a lista</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetalhesPontoTuristico;
