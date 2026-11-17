import { memo, useCallback, useRef, useState } from "react";
import { ItemDoacao } from "../types";
import { getDoacoes, ultimaPaginaDoacoes } from "../service/doacoes-service";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const PontoMemo = memo(function PontoMemo({
  itemDoacao,
}: {
  itemDoacao: ItemDoacao;
}) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("TelaDetalheDoacao", { doacaoId: itemDoacao.id });
      }}
      style={styles.pontoItem}
    >
      <Text style={styles.pontoNome}>{itemDoacao.nome}</Text>
      <Text style={styles.pontoEndereco}>Tipo: {itemDoacao.tipoItem}</Text>
      <Text style={styles.pontoEndereco}>
        Quantidade: {itemDoacao.quantidade}
      </Text>
      <Text style={styles.pontoEndereco}>
        Ponto de Destino: {itemDoacao.pontoDestino}
      </Text>
    </Pressable>
  );
});

export default function MinhasDoacoes() {
  const [doacoes, setDoacoes] = useState<ItemDoacao[]>([]);
  const [textoBusca, setTextoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [ultimaPagina, setUltimaPagina] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const buscandoMais = useRef(false);
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      setCarregando(true);
      setErro("");
      getDoacoes(0, textoBusca)
        .then((pagina) => {
          setDoacoes(pagina.content);
          setPaginaAtual(0);
          setUltimaPagina(ultimaPaginaDoacoes(pagina));
        })
        .catch((error: unknown) =>
          setErro(`Erro ao carregar doações: ${mensagemDeErro(error)}`),
        )
        .finally(() => setCarregando(false));
    }, [textoBusca]),
  );

  async function carregarMais() {
    if (buscandoMais.current || ultimaPagina || carregando) return;
    buscandoMais.current = true;
    try {
      const pagina = await getDoacoes(paginaAtual + 1, textoBusca);
      setDoacoes((atuais) => [...atuais, ...pagina.content]);
      setPaginaAtual((atual) => atual + 1);
      setUltimaPagina(ultimaPaginaDoacoes(pagina));
    } catch (error) {
      setErro(`Erro ao carregar mais doações: ${mensagemDeErro(error)}`);
    } finally {
      buscandoMais.current = false;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={[
            styles.listContainer,
            {
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
              paddingTop: insets.top / 2,
            },
          ]}
          data={doacoes}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.8}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PontoMemo itemDoacao={item} />}
          ListHeaderComponent={
            <>
              <TextInput
                style={[styles.textInput, { marginTop: 16 }]}
                placeholder="Buscar por tipo de item"
                value={textoBusca}
                onChangeText={setTextoBusca}
                autoCorrect={false}
                returnKeyType="done"
              />
              {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
            </>
          }
          ListEmptyComponent={
            carregando ? (
              <ActivityIndicator size="large" color="#b4dd1e" />
            ) : erro ? (
              <Text>{erro}</Text>
            ) : doacoes.length === 0 ? (
              <Text>Você ainda não fez nenhuma doação.</Text>
            ) : (
              <Text>Nenhuma doação encontrada.</Text>
            )
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
