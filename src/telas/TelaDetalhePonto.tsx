import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalhePonto">;

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
      <Text style={styles.linha}>Dias que atende: {ponto.diasQueAtende.join(", ")}</Text>
      <Text style={styles.linha}>Tipos de doação: {ponto.tiposDeDoacao.join(", ")}</Text>
    </View>
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
  container: {
    flex: 1,
    padding: 20,
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