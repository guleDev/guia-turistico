import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesContextData } from '@types';

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

const FAVORITES_KEY = '@GuiaTuristico:favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) setFavoriteIds(JSON.parse(stored));
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoadingFavorites(false);
    }
  }, []);

  const saveFavorites = useCallback(async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
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
    setFavoriteIds((prev) =>
      prev.includes(pontoId) ? prev.filter((id) => id !== pontoId) : [...prev, pontoId]
    );
  };

  const isFavorite = useCallback(
    (pontoId: string) => favoriteIds.includes(pontoId),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isLoadingFavorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};
