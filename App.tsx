import { StatusBar } from 'expo-status-bar';
import PontoTuristicoCard from "./components/PontoTuristicoCard/PontoTuristicoCard";
import { View, Text, ScrollView } from "react-native";
import { styles } from './app.style';

export default function App() {
  return (<>
    <ScrollView style={styles.scrollViewContainer}>
      <View>
        <Text>Conheça Curitiba!</Text>
        <PontoTuristicoCard
          nome="Gato Preto"
          descricao="Melhor costela de Curitiba"
        />
        <PontoTuristicoCard
          nome="Jardim Botânico"
          descricao="Um dos mais famosos cartões-postais da cidade."
        />
        <PontoTuristicoCard
          nome="Ópera de Arame"
          descricao="Teatro com estrutura tubular e teto transparente, em meio à natureza."
        />
        <PontoTuristicoCard
          nome="Parque Tanguá"
          descricao="Antiga pedreira transformada em parque com cascata e mirante."
        />
        <PontoTuristicoCard
          nome="Museu Oscar Niemeyer"
          descricao="Conhecido como Museu do Olho, com arte moderna e contemporânea."
        />
        <StatusBar style="auto" />
      </View >
    </ScrollView>
  </>
  )
}