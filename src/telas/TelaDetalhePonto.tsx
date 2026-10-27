import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { useEffect, useState } from "react";
import { getPontos } from "../serivce/ponto-service";

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
          Tipos de doação: {ponto.tiposDoacao.join(", ")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function TelaDetalhePonto({ route }: Props) {
  const { pontoId } = route.params;
  const [ponto, setPonto] = useState<Ponto | undefined>(undefined);
  useEffect(() => {
    getPontos(1, "").then((response) => {
      const pontoEncontrado = response.content.find((p) => p.id === pontoId);
      setPonto(pontoEncontrado);
    });
  }, [pontoId]);

  if (!ponto) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textErro}>Ponto não encontrado.</Text>
      </ScrollView>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}
