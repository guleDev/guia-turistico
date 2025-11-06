import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { deletePost } from "@services/api";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface PontoDetalhes {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  detalhesCompletos: string;
}

type RootStackParamList = {
  DetalhesPonto: { pontoDetalhes: PontoDetalhes };
  GerenciarPonto: { pontoDetalhes?: PontoDetalhes };
};

type DetalhesRouteProp = RouteProp<RootStackParamList, "DetalhesPonto">;
type DetalhesNavProp = NativeStackNavigationProp<RootStackParamList, "DetalhesPonto">;

export default function DetalhesPontoTuristico() {
  const route = useRoute<DetalhesRouteProp>();
  const navigation = useNavigation<DetalhesNavProp>();
  const { pontoDetalhes } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: pontoDetalhes.nome });
  }, [pontoDetalhes.nome, navigation]);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja excluir "${pontoDetalhes.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            setIsLoading(true);
            try {
              await deletePost(pontoDetalhes.id);
              Alert.alert("Sucesso", "Ponto excluído com sucesso!");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir o ponto.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: pontoDetalhes.imagem }} style={styles.imagem} />
      <View style={styles.content}>
        <Text style={styles.titulo}>{pontoDetalhes.nome}</Text>
        <Text style={styles.descricao}>{pontoDetalhes.detalhesCompletos}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Editar Ponto"
            onPress={() => navigation.navigate("GerenciarPonto", { pontoDetalhes })}
            color="#007bff"
            disabled={isLoading}
          />
          <View style={{ width: 10 }} />
          <Button
            title="Excluir Ponto"
            onPress={handleDelete}
            color="#dc3545"
            disabled={isLoading}
          />
        </View>

        {isLoading && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  imagem: { width: "100%", height: 250, resizeMode: "cover" },
  content: { padding: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#333" },
  descricao: { fontSize: 16, lineHeight: 24, color: "#555" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 20,
  },
  loadingIndicator: { marginTop: 20 },
});
