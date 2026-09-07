import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalhePonto">;

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Text style={styles.nome}>{ponto.nome}</Text>
        <Text style={styles.endereco}>{ponto.endereco}</Text>
        <Text style={styles.linha}>
          Dias que atende: {ponto.diasQueAtende.join(", ")}
        </Text>
        <Text style={styles.linha}>
          Tipos de doação: {ponto.tiposDeDoacao.join(", ")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function TelaDetalhePonto({ route }: Props) {
  const { pontoId } = route.params;
  const ponto = pontosMock.find((item) => item.id === pontoId);

  if (!ponto) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Ponto não encontrado.</Text>
      </View>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: '#676767'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  nome: {
    fontSize: 22,
    fontWeight: "700",
  },
  endereco: {
    marginTop: 8,
    fontSize: 16,
  },
  linha: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
  },
  erro: {
    fontSize: 16,
    color: "#b00020",
  },
});
