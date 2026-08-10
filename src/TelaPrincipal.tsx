import { View, Text } from "react-native";
import TelaDetalhePonto from "./telas/TelaDetalhePonto";
import TelaListaPontos from "./telas/TelaListaPontos";
import { DIAS_SEMANA, Ponto, TIPOS_DOACAO } from "./types";

const pontosMock: Ponto[] = [
  {
    id: 1,
    nome: "Ponto de Doação A",
    endereco: "Rua A, 123",
    diasQueAtende: [DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS],
  },
  {
    id: 2,
    nome: "Ponto de Doação B",
    endereco: "Rua B, 456",
    diasQueAtende: [DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS],
  }
];


export default function TelaPrincipal() {
  return (
    <View>
      <Text>Pontos:</Text>
      <TelaListaPontos pontos={pontosMock} />
      <Text>------------------</Text>
      <Text>Detalhes do 1* Ponto:</Text>
      <TelaDetalhePonto ponto={pontosMock[0]} />
    </View>
  );
}
