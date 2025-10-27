import { ParamListBase } from "@react-navigation/native"
import { GestureResponderEvent } from "react-native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetalhesPontoTuristicoNavigationProp = NativeStackNavigationProp<any>;

interface PontoTuristicoCardProps {
    id: string
    nome: string
    descricao: string
    imagem: string
}

interface PontoTuristicoDetalhesProps {
    id: string;
    nome: string;
    descricao: string;
    imagem: string;
    localizacao?: string;
    horarioFuncionamento?: string;
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

interface PontoDetalhesProp {
    id: string;
    nome: string;
    descricao: string;
    imagem?: string;
    detalhesCompletos?: string;
    latitude?: number;
    longitude?: number;
}

export { DetalhesPontoTuristicoNavigationProp } // types
export { PontoTuristicoCardProps, PontoTuristicoDetalhesProps, ButtonProps, DadosAdaptados, ApiResponseItem, RootStackParamList, FavoritesContextData, FavoritesProviderProps, PontoDetalhesProp } // interfaces