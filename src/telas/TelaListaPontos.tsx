import { View, Text } from "react-native";
import { Ponto } from "../types";

function PontoItem({ ponto }: { ponto: Ponto }) {
  return (
    <View>
      <Text>{ponto.nome}</Text>
    </View>
  );
}

export default function TelaListaPontos({ pontos }: { pontos: Ponto[] }) {
  return (
    <View>
      {pontos.map((ponto) => (
        <PontoItem key={ponto.id} ponto={ponto} />
      ))}
    </View>
  );
}
