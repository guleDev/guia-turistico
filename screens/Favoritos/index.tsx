import React, { JSX, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import api from "@services/api";
import { useFavorites } from "@context/FavoritesContext";
import PontoTuristicoCard from "@components/PontoTuristicoCard";
import { ApiResponseItem, DadosAdaptados } from "@/types/types";
import { styles } from "./Favoritos.style";

export default function FavoritosScreen(): JSX.Element {
  const { favoriteIds, isLoadingFavorites } = useFavorites();

  const [favoritos, setFavoritos] = useState<DadosAdaptados[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!favoriteIds.length) {
        setFavoritos([]);
        setIsLoading(false);
        return;
      }

      try {
        // 🔹 Busca todos os pontos (igual à lista principal)
        const response = await api.get("/posts");
        const todosPontos: DadosAdaptados[] = response.data.map(
          (item: ApiResponseItem) => ({
            id: String(item.id),
            nome: item.title,
            descricao: item.body,
            imagem: `https://picsum.photos/id/${item.id % 100}/150/150`,
          })
        );

        // 🔹 Filtra apenas os favoritos
        const pontosFavoritos = todosPontos.filter((ponto) =>
          favoriteIds.includes(ponto.id)
        );

        setFavoritos(pontosFavoritos);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
        setError("Não foi possível carregar os favoritos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritos();
  }, [favoriteIds]);

  // Carregando contexto + API
  if (isLoadingFavorites || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </View>
    );
  }

  // Erro na requisição
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Nenhum favorito encontrado
  if (!favoritos.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum ponto turístico favoritado ainda.</Text>
      </View>
    );
  }

  // Lista de favoritos
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Meus Favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PontoTuristicoCard
            id={item.id}
            nome={item.nome}
            descricao={item.descricao}
            imagem={item.imagem}
          />
        )}
      />
    </View>
  );
}
