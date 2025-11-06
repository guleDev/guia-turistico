import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createPost, updatePost } from "@services/api";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PontoDetalhesProp } from "@/types/types";

type RootStackParamList = {
  GerenciarPonto: { pontoDetalhes?: PontoDetalhesProp };
};

type GerenciarPontoRouteProp = RouteProp<RootStackParamList, "GerenciarPonto">;
type GerenciarPontoNavProp = NativeStackNavigationProp<RootStackParamList, "GerenciarPonto">;

export default function GerenciarPontoTuristico() {
  const navigation = useNavigation<GerenciarPontoNavProp>();
  const route = useRoute<GerenciarPontoRouteProp>();
  const { pontoDetalhes } = route.params || {};

  const [title, setTitle] = useState<string>(pontoDetalhes ? pontoDetalhes.nome : "");
  const [body, setBody] = useState<string>(pontoDetalhes ? pontoDetalhes.descricao : "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEditing = !!pontoDetalhes;

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Ponto Turístico" : "Adicionar Ponto Turístico",
    });
  }, [isEditing, navigation]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o título e a descrição.");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && pontoDetalhes) {
        await updatePost(pontoDetalhes.id, { title, body });
        Alert.alert("Sucesso", "Ponto turístico atualizado com sucesso!");
      } else {
        await createPost({ title, body, userId: 1 });
        Alert.alert("Sucesso", "Novo ponto turístico criado com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o ponto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título do Ponto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Jardim Botânico"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o ponto turístico..."
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Button
        title={isEditing ? "Atualizar Ponto" : "Adicionar Ponto"}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  label: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  loading: { marginTop: 20 },
});
