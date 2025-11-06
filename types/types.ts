import { ParamListBase } from "@react-navigation/native"
import { GestureResponderEvent } from "react-native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetalhesPontoTuristicoNavigationProp = NativeStackNavigationProp<any>;

interface PontoDetalhesProp {
    id: string;
    nome: string;
    descricao: string;
    imagem?: string;
    horarioFuncionamento?: string;
    detalhesCompletos?: string;
    localizacao?: string;
    latitude?: number;
    longitude?: number;
}

interface ButtonProps {
    children: React.ReactNode
    action?: (event: GestureResponderEvent) => void
}

interface DadosAdaptados {
    id: string
    nome: string
    descricao: string
    imagem: string
}

interface ApiResponseItem {
    id: number;
    title: string;
    body: string;
}

interface RootStackParamList extends ParamListBase {
    Home: undefined;
    Detalhes: { id: string };
}

interface FavoritesContextData {
    favoriteIds: string[];
    isLoadingFavorites: boolean;
    toggleFavorite: (pontoId: string) => void;
    isFavorite: (pontoId: string) => boolean;
}

interface FavoritesProviderProps {
    children: React.ReactNode;
}

interface PostData {
  title: string;
  body: string;
  userId?: number;
}

export { DetalhesPontoTuristicoNavigationProp } // types
export { ButtonProps, DadosAdaptados, ApiResponseItem, RootStackParamList, FavoritesContextData, FavoritesProviderProps, PontoDetalhesProp, PostData } // interfaces