import React, { useState, useEffect, JSX } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Tipagem explícita da resposta do ImagePicker
type ImagePickerResult = {
  canceled: boolean;
  assets?: { uri: string }[];
};

export default function PerfilScreen(): JSX.Element {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Solicita permissões ao carregar a tela
  useEffect(() => {
    (async () => {
      try {
        // Permissão para galeria
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== "granted") {
          Alert.alert(
            "Permissão Necessária",
            "Precisamos de permissão para acessar sua galeria para escolher uma foto."
          );
        }

        // Permissão para câmera
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== "granted") {
          Alert.alert(
            "Permissão Necessária",
            "Precisamos de permissão para acessar sua câmera para tirar uma foto."
          );
        }
      } catch (error) {
        console.error("Erro ao solicitar permissões:", error);
      }
    })();
  }, []);

  // Tirar foto com a câmera
  const takePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir câmera:", error);
    }
  };

  // Escolher da galeria
  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Imagem capturada:", uri);
    } else {
      console.log("Captura cancelada");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Adicione uma foto</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Tirar Foto" onPress={takePicture} />
        <Button title="Escolher da Galeria" onPress={pickImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});
