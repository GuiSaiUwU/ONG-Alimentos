import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { deleteDoacao, getDoacaoById } from "../service/doacoes-service";
import { useCallback, useState } from "react";
import { ItemDoacao, RootStackParamList } from "../types";
import { Alert, Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalheDoacao">;

function DetalheItemDoacao({ itemDoacao }: { itemDoacao: ItemDoacao }) {
  return (
    <View style={styles.pontoItem}>
      <Text style={styles.pontoNome}>{itemDoacao.nome}</Text>
      <Text style={styles.pontoEndereco}>Tipo: {itemDoacao.tipoItem}</Text>
      <Text style={styles.pontoEndereco}>
        Quantidade: {itemDoacao.quantidade}
      </Text>
      <Text style={styles.pontoEndereco}>
        Data: {format(new Date(itemDoacao.criadoEm), "dd/MM/yyyy HH:mm")}
      </Text>
      <Text style={styles.pontoEndereco}>
        Ponto de Destino: {itemDoacao.pontoDestino}
      </Text>
    </View>
  );
}

function BotaoDeletar({ doacaoId }: { doacaoId: string }) {
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
                await deleteDoacao(doacaoId);
                navigation.goBack();
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

function BotaoEditar({ doacaoId }: { doacaoId: string }) {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate("CadastrarDoacao", { doacaoId })}
    >
      <Text style={styles.buttonText}>Editar Doação</Text>
    </Pressable>
  );
}

export default function DetalheDoacao({ route }: Props) {
  const { doacaoId } = route.params;
  const [doacao, setDoacao] = useState<ItemDoacao | null>(null);

  useFocusEffect(
    useCallback(() => {
      getDoacaoById(doacaoId)
        .then(setDoacao)
        .catch((error) => console.error("Erro ao carregar doação:", error));
    }, [doacaoId]),
  );

  return (
    <SafeAreaView>
      {doacao ? (
        <>
          <View style={[styles.pickerContainer, { paddingBottom: 8 }]}>
            <DetalheItemDoacao itemDoacao={doacao} />
            <BotaoEditar doacaoId={doacao.id} />
            <BotaoDeletar doacaoId={doacao.id} />
          </View>
        </>
      ) : (
        <Text>Doação não encontrada</Text>
      )}
    </SafeAreaView>
  );
}
