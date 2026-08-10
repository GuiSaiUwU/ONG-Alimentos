import { View, Text } from "react-native";
import { Ponto } from "../types";


function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View>
      <Text>{ponto.nome}</Text>
      <Text>{ponto.endereco}</Text>
      <Text>Dias que atende: {ponto.diasQueAtende.join(", ")}</Text>
      <Text>Tipos de doação: {ponto.tiposDeDoacao.join(", ")}</Text>
    </View>
  );
}


export default function TelaDetalhePonto({ ponto }: { ponto: Ponto }) {
    return <DetalhePonto ponto={ponto} />;
}