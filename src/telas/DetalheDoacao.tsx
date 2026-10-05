import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { deletarDoacao, listarDoacoes } from "../dados/doacoesStorage";
import { useEffect, useState } from "react";
import { ItemDoacao, RootStackParamList } from "../types";
import { Alert, Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalheDoacao">;

function DetalheItemDoacao({ itemDoacao }: { itemDoacao: ItemDoacao }) {
  return (
    <View style={styles.pontoItem}>
      <Text style={styles.pontoNome}>{itemDoacao.nome}</Text>
      <Text style={styles.pontoEndereco}>Tipo: {itemDoacao.tipo}</Text>
      <Text style={styles.pontoEndereco}>
        Quantidade: {itemDoacao.quantidade}
      </Text>
      <Text style={styles.pontoEndereco}>
        Data: {format(itemDoacao.criadoEm, "dd/MM/yyyy HH:mm")}
      </Text>
      <Text style={styles.pontoEndereco}>
        Ponto de Destino: {itemDoacao.pontoDestino.nome}
      </Text>
    </View>
  );
}

function BotaoDeletar({ doacaoId }: { doacaoId: number }) {
  // Passa o tipo genérico indicando que a tela 'MinhasDoacoes' existe
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Pressable
      style={[styles.button, { backgroundColor: "#ff5b5b" }]}
      onPress={() => {
        Alert.alert("Excluir Doação", "Deseja realmente excluir a doação?", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              try {
                await deletarDoacao(doacaoId);
                navigation.navigate("TelaMinhasDoacoes");
              } catch (error) {
                console.error("Erro ao deletar: ", error);
              }
            },
          },
        ]);
      }}
    >
      <Text style={styles.buttonText}>Excluir Doação</Text>
    </Pressable>
  );
}

export default function DetalheDoacao({ route }: Props) {
  const { doacaoId } = route.params;
  const [doacao, setDoacao] = useState<ItemDoacao | null>(null);

  useEffect(() => {
    listarDoacoes().then((doacoes) => {
      const doacao = doacoes.find((item) => item.id === doacaoId);
      if (!doacao) {
        console.error("Doação não encontrada");
      } else {
        setDoacao(doacao);
      }
    });
  }, [doacaoId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {doacao ? (
        <>
          <DetalheItemDoacao itemDoacao={doacao} />
          <BotaoDeletar doacaoId={doacao.id} />
        </>
      ) : (
        <Text>Doação não encontrada</Text>
      )}
    </SafeAreaView>
  );
}
