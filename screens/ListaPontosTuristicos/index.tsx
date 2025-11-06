import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, FlatList, View, TouchableOpacity } from "react-native";

import api from "@services/api";
import { ApiResponseItem, DadosAdaptados } from "@/types/types";

import { useNavigation } from "@react-navigation/native";

import PontoTuristicoCard from "@components/PontoTuristicoCard";

import { styles } from "./ListaPontosTuristicos.style";
import { Ionicons } from "@expo/vector-icons";

export default function ListaPontosTuristicos() {
    const [pontosTuristicos, setPontosTuristicos] = useState<DadosAdaptados[]>([]);
    const [isLoading, setIsLoading] = useState(true); // <-- Estado para carregamento
    const [error, setError] = useState<string | null>(null); // <-- Estado para erros

    const navigation = useNavigation()

    useEffect(() => { // <-- Hook para executar a requisição ao montar o componente
        const fetchPontosTuristicos = async () => {
            try {
                const response = await api.get('/posts'); // <-- Fazendo a requisição GET
                // Adaptando os dados da API (jsonplaceholder) para nosso formato de ponto turístico
                const dadosAdaptados: DadosAdaptados[] = response.data.map((item: ApiResponseItem) => ({
                    id: String(item.id),
                    nome: item.title,
                    descricao: item.body,
                    imagem: `https://picsum.photos/id/${item.id % 100}/150/150`, // Imagem fictícia
                    // Adicionar aqui lat/lon se a API tivesse (será adicionado em aulas futuras)
                }));
                setPontosTuristicos(dadosAdaptados);
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Não foi possível carregar os pontos turísticos."); // <-- Define a mensagem de erro
            } finally {
                setIsLoading(false); // <-- Finaliza o carregamento
            }
        };

        fetchPontosTuristicos();
    }, []); // <-- Array de dependências vazio: executa apenas uma vez (ao montar)

    if (isLoading) {
        return (
            <View style={styles.loadingContainer} >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}> Carregando pontos turísticos...</Text>
            </View>
        );
    }

    if (error) { // <-- Condição para mostrar a mensagem de erro
        return (
            <View style={styles.errorContainer} >
                <Text style={styles.errorText}> {error} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <Text style={styles.mainTitle}>Pontos Turísticos</Text>
            <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("GerenciarPonto", {})}
            >
                <Ionicons name="add-circle" size={30} color="#007bff" />
                <Text style={styles.addButtonText}>Adicionar Novo Ponto</Text>
            </TouchableOpacity>
            < FlatList // <-- Usando FlatList para exibir a lista
                data={pontosTuristicos}
                keyExtractor={(item: DadosAdaptados) => item.id}
                renderItem={({ item }) => (
                    <PontoTuristicoCard id={item.id} nome={item.nome} descricao={item.descricao} imagem={item.imagem}/>
                )}
            />
        </View>
    );
};