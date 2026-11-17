import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Platform, Pressable, ScrollView, Text } from "react-native";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { deletePonto, getByPontoId } from "../service/ponto-service";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalhePonto">;

function DetalhePonto({
  ponto,
  onEditar,
  onExcluir,
  excluindo,
}: {
  ponto: Ponto;
  onEditar: () => void;
  onExcluir: () => void;
  excluindo: boolean;
}) {
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
        <Text style={styles.linha}>Latitude: {ponto.latitude}</Text>
        <Text style={styles.linha}>Longitude: {ponto.longitude}</Text>
        <Pressable style={styles.button} onPress={onEditar}>
          <Text style={styles.buttonText}>Editar ponto</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "#ff5b5b" }]}
          onPress={onExcluir}
          disabled={excluindo}
        >
          <Text style={styles.buttonText}>
            {excluindo ? "Excluindo..." : "Excluir ponto"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function TelaDetalhePonto({ navigation, route }: Props) {
  const { pontoId } = route.params;
  const [ponto, setPonto] = useState<Ponto | undefined>(undefined);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  const carregarPonto = useCallback(() => {
    setErro("");
    getByPontoId(pontoId)
      .then(setPonto)
      .catch((error: unknown) => setErro(`Erro ao carregar o ponto: ${mensagemDeErro(error)}`));
  }, [pontoId]);

  useFocusEffect(useCallback(() => {
    carregarPonto();
  }, [carregarPonto]));

  function confirmarExclusao() {
    if (Platform.OS === "web") {
      if (window.confirm("Deseja realmente excluir este ponto?")) {
        void excluir();
      }
      return;
    }

    Alert.alert("Excluir ponto", "Deseja realmente excluir este ponto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => void excluir() },
    ]);
  }

  async function excluir() {
    setErro("");
    setExcluindo(true);
    try {
      await deletePonto(pontoId);
      navigation.goBack();
    } catch (error) {
      setErro(`Erro ao excluir o ponto: ${mensagemDeErro(error)}`);
    } finally {
      setExcluindo(false);
    }
  }

  if (!ponto) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textErro}>{erro || "Carregando ponto..."}</Text>
      </ScrollView>
    );
  }

  return (
    <DetalhePonto
      ponto={ponto}
      onEditar={() => navigation.navigate("CadastrarPonto", { pontoId: ponto.id })}
      onExcluir={confirmarExclusao}
      excluindo={excluindo}
    />
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
