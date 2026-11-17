import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ponto, RootStackParamList } from "../types";
import { styles } from "../utils/styling";
import { getPontos, ultimaPagina } from "../service/ponto-service";

type Props = NativeStackScreenProps<RootStackParamList, "TelaListaPontos">;

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.pontoItem}>
      <Text style={styles.pontoNome}>{ponto.nome}</Text>
      <Text style={styles.pontoEndereco}>{ponto.endereco}</Text>
    </Pressable>
  );
}

export default function TelaListaPontos({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [buscaPonto, setBuscaPonto] = useState("");
  const [ehUltimaPagina, setEhUltimaPagina] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const buscandoMais = useRef(false);

  const carregarPrimeiraPagina = useCallback(() => {
    setCarregando(true);
    setErro("");
    getPontos(0, buscaPonto)
      .then((resposta) => {
        setPontos(resposta.content);
        setPaginaAtual(0);
        setEhUltimaPagina(ultimaPagina(resposta));
      })
      .catch((error: unknown) => setErro(`Erro ao carregar pontos: ${mensagemDeErro(error)}`))
      .finally(() => setCarregando(false));
  }, [buscaPonto]);

  useFocusEffect(
    useCallback(() => {
      carregarPrimeiraPagina();
    }, [carregarPrimeiraPagina]),
  );

  async function carregarMaisPontos() {
    if (buscandoMais.current || ehUltimaPagina || carregando) {
      return;
    }

    buscandoMais.current = true;
    try {
      const resposta = await getPontos(paginaAtual + 1, buscaPonto);
      setPontos((atual) => [...atual, ...resposta.content]);
      setPaginaAtual((atual) => atual + 1);
      setEhUltimaPagina(ultimaPagina(resposta));
    } catch (error) {
      setErro(`Erro ao carregar mais pontos: ${mensagemDeErro(error)}`);
    } finally {
      buscandoMais.current = false;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          style={styles.flatList}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
          data={pontos}
          onEndReached={carregarMaisPontos}
          onEndReachedThreshold={0.8}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <PontoItem
                ponto={item}
                onPress={() =>
                  navigation.navigate("TelaDetalhePonto", { pontoId: item.id })
                }
              />
            </View>
          )}
          ListHeaderComponent={
            <View style={styles.container}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("CadastrarPonto")}
              >
                <Text style={styles.buttonText}>Cadastrar ponto</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("CadastrarDoacao")}
              >
                <Text style={styles.buttonText}>Cadastrar doação</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: "#b4dd1e" }]}
                onPress={() => navigation.navigate("TelaMinhasDoacoes")}
              >
                <Text style={styles.buttonText}>Minhas doações</Text>
              </Pressable>
              <Text style={styles.title}>Pontos de coleta</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Buscar ponto de coleta"
                value={buscaPonto}
                onChangeText={setBuscaPonto}
              />
              {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.container}>
              {carregando ? (
                <ActivityIndicator size="large" color="#b4dd1e" />
              ) : (
                <Text style={styles.textErro}>
                  {buscaPonto
                    ? "Nenhum ponto de coleta encontrado."
                    : "Nenhum ponto de coleta encontrado."}
                </Text>
              )}
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
