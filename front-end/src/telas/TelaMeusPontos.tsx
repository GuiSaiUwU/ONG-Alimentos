import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiError } from "../service/api";
import { getByPontoId } from "../service/ponto-service";
import { getFavoritos, removerFavorito } from "../service/favoritos-service";
import { Ponto, RootStackParamList } from "../types";
import { styles } from "../utils/styling";

type Props = NativeStackScreenProps<RootStackParamList, "TelaMeusPontos">;

export default function TelaMeusPontos({ navigation }: Props) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarPontos = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const ids = await getFavoritos();
      const resultados = await Promise.allSettled(ids.map((id) => getByPontoId(id)));
      const existentes: Ponto[] = [];
      const removidos: string[] = [];
      const erros: string[] = [];

      resultados.forEach((resultado, indice) => {
        if (resultado.status === "fulfilled") {
          existentes.push(resultado.value);
        } else if (resultado.reason instanceof ApiError && resultado.reason.status === 404) {
          removidos.push(ids[indice]);
        } else {
          erros.push(mensagemDeErro(resultado.reason));
        }
      });

      await Promise.all(removidos.map((id) => removerFavorito(id)));
      setPontos(existentes);
      if (erros.length > 0) {
        setErro(`Erro ao carregar alguns favoritos: ${erros[0]}`);
      }
    } catch (error) {
      setErro(`Erro ao carregar favoritos: ${mensagemDeErro(error)}`);
      setPontos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    void carregarPontos();
  }, [carregarPontos]));

  async function desmarcar(id: string) {
    try {
      await removerFavorito(id);
      setPontos((atual) => atual.filter((ponto) => ponto.id !== id));
    } catch (error) {
      setErro(`Erro ao remover favorito: ${mensagemDeErro(error)}`);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        data={pontos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.pontoItemLinha, styles.pontoItem]}>
            <Pressable
              onPress={() => navigation.navigate("TelaDetalhePonto", { pontoId: item.id })}
              style={styles.pontoItemConteudo}
            >
              <Text style={styles.pontoNome}>{item.nome}</Text>
              <Text style={styles.pontoEndereco}>{item.endereco}</Text>
            </Pressable>
            <Pressable
              accessibilityLabel="Desfavoritar ponto"
              accessibilityRole="button"
              onPress={() => desmarcar(item.id)}
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteText}>♥</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View>
            {carregando ? (
              <ActivityIndicator size="large" color="#b4dd1e" />
            ) : (
              <Text style={styles.textErro}>
                {erro || "Você ainda não favoritou nenhum ponto."}
              </Text>
            )}
          </View>
        }
        ListHeaderComponent={
          erro && pontos.length > 0 ? <Text style={styles.textErro}>{erro}</Text> : undefined
        }
      />
    </SafeAreaView>
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
