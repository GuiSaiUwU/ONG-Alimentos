import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { deleteDoacao, getDoacaoById } from "../service/doacoes-service";
import { useCallback, useState } from "react";
import { ItemDoacao, RootStackParamList } from "../types";
import { ActivityIndicator, Alert, Platform, Pressable, Text, View } from "react-native";
import { format } from "date-fns";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { ApiError } from "../service/api";

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

export default function DetalheDoacao({ navigation, route }: Props) {
  const { doacaoId } = route.params;
  const [doacao, setDoacao] = useState<ItemDoacao | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      setErro("");
      getDoacaoById(doacaoId)
        .then(setDoacao)
        .catch((error: unknown) => {
          setDoacao(null);
          setErro(
            error instanceof ApiError && error.status === 404
              ? "doação não encontrada"
              : `Erro ao carregar a doação: ${mensagemDeErro(error)}`,
          );
        })
        .finally(() => setCarregando(false));
    }, [doacaoId]),
  );

  function confirmarExclusao() {
    if (Platform.OS === "web") {
      if (window.confirm("Deseja realmente excluir a doação?")) {
        void excluir();
      }
      return;
    }

    Alert.alert("Excluir doação", "Deseja realmente excluir a doação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => void excluir() },
    ]);
  }

  async function excluir() {
    setErro("");
    setExcluindo(true);
    try {
      await deleteDoacao(doacaoId);
      navigation.goBack();
    } catch (error) {
      setErro(`Erro ao excluir a doação: ${mensagemDeErro(error)}`);
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {carregando ? <ActivityIndicator size="large" color="#b4dd1e" /> : null}
      {!carregando && doacao ? (
        <View style={[styles.pickerContainer, { paddingBottom: 8 }]}>
          <DetalheItemDoacao itemDoacao={doacao} />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("CadastrarDoacao", { doacaoId })}
            disabled={excluindo}
          >
            <Text style={styles.buttonText}>Editar doação</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "#ff5b5b" }]}
            onPress={confirmarExclusao}
            disabled={excluindo}
          >
            <Text style={styles.buttonText}>
              {excluindo ? "Excluindo..." : "Excluir doação"}
            </Text>
          </Pressable>
        </View>
      ) : null}
      {!carregando && !doacao ? (
        <Text style={styles.textErro}>{erro || "doação não encontrada"}</Text>
      ) : null}
      {erro && doacao ? <Text style={styles.textErro}>{erro}</Text> : null}
    </SafeAreaView>
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
