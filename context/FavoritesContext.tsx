import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesContextType, FavoritesProviderProps } from '@types'

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = '@GuiaTuristico:favorites';

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState<boolean>(true);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites !== null) {
        setFavoriteIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos do AsyncStorage:", error);
    } finally {
      setIsLoadingFavorites(false);
    }
  }, []);

  const saveFavorites = useCallback(async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error("Erro ao salvar favoritos no AsyncStorage:", error);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    if (!isLoadingFavorites) {
      saveFavorites(favoriteIds);
    }
  }, [favoriteIds, isLoadingFavorites, saveFavorites]);

  const toggleFavorite = (pontoId: string) => {
    setFavoriteIds(prevIds =>
      prevIds.includes(pontoId)
        ? prevIds.filter(id => id !== pontoId)
        : [...prevIds, pontoId]
    );
  };

  const isFavorite = useCallback(
    (pontoId: string) => favoriteIds.includes(pontoId),
    [favoriteIds]
  );

  const contextValue: FavoritesContextType = {
    favoriteIds,
    isLoadingFavorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de um FavoritesProvider");
  }
  return context;
};
