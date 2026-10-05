import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalhePonto">;

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.pontoNome}>{ponto.nome}</Text>
        <Text style={styles.pontoEndereco}>{ponto.endereco}</Text>
        <Text style={styles.linha}>
          Dias que atende: {ponto.diasQueAtende.join(", ")}
        </Text>
        <Text style={styles.linha}>
          Tipos de doação: {ponto.tiposDeDoacao.join(", ")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function TelaDetalhePonto({ route }: Props) {
  const { pontoId } = route.params;
  const ponto = pontosMock.find((item) => item.id === pontoId);

  if (!ponto) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textErro}>Ponto não encontrado.</Text>
      </ScrollView>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}
