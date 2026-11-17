import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import { ItemDoacao, Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  atualizarDoacao,
  listarDoacoes,
  salvarDoacao,
} from "../dados/doacoesStorage";
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

export default function TelaListaPontos({ navigation, route }: Props) {
  const doacaoId = route.params?.doacaoId;
  const editando = doacaoId !== undefined;
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [pontoDestino, setPontoDestino] = useState<string | null>(null);
  const [tipo, setTipo] = useState<TIPOS_DOACAO>(TIPOS_DOACAO.ALIMENTOS);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [doacaoCarregada, setDoacaoCarregada] = useState(!editando);
  const insets = useSafeAreaInsets();

  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [buscaPonto, setBuscaPonto] = useState("");
  const [ehUltimaPagina, setEhUltimaPagina] = useState(false);
  const buscandoMais = useRef(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: editando ? "Editar doação" : "Pontos de coleta",
    });
  }, [editando, navigation]);

  useEffect(() => {
    if (doacaoId === undefined) {
      return;
    }

    listarDoacoes()
      .then((doacoes) => {
        const doacao = doacoes.find((item) => item.id === doacaoId);
        if (!doacao) {
          setErro("Doação não encontrada");
          return;
        }
        setNome(doacao.nome);
        setQuantidade(doacao.quantidade.toString());
        setTipo(doacao.tipo);
        setPontoDestino(doacao.pontoDestino.id);
        setDoacaoCarregada(true);
      })
      .catch((error) => setErro("Erro ao carregar a doação: " + error.message));
  }, [doacaoId]);

  async function validarESalvar() {
    setSucesso("");

    if (!nome || !quantidade || !tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    if (isNaN(Number(quantidade))) {
      setErro("Quantidade deve ser um número");
      return;
    }

    if (pontoDestino === null || pontoDestino === "") {
      setErro("Selecione um ponto de doação válido");
      return;
    }

    const itemDoacao: ItemDoacao = {
      id: doacaoId ?? -1,
      criadoEm: 0 as unknown as Date,
      nome,
      tipo,
      quantidade: Number(quantidade),
      pontoDestino: pontos.find((ponto) => ponto.id === pontoDestino)!,
    };

    const salvar = editando ? atualizarDoacao : salvarDoacao;

    await salvar(itemDoacao)
      .then(() => {
        setErro("");
        if (editando) {
          navigation.goBack();
          return;
        }
        setSucesso(`${nome} cadastrado com sucesso!`);

        setPontoDestino(null);
        setNome("");
        setQuantidade("");
        setTipo(TIPOS_DOACAO.ALIMENTOS);
      })
      .catch((error) => {
        setErro("Erro ao salvar a doação: " + error.message);
      });
  }

  useEffect(() => {
    if (editando && !doacaoCarregada) {
      return;
    }

    const pontosValidos = pontos.filter((ponto) =>
      ponto.tiposDoacao.includes(tipo.toUpperCase()),
    );

    if (
      pontosValidos.length > 0 &&
      (!editando ||
        pontoDestino === null ||
        !pontosValidos.some((ponto) => ponto.id === pontoDestino))
    ) {
      setPontoDestino(pontosValidos[0].id);
    }
  }, [doacaoCarregada, doacaoId, editando, pontoDestino, tipo]);
  
  const carregarPrimeiraPagina = useCallback(() => {
    setCarregando(true);
    getPontos(0, buscaPonto)
      .then((resposta) => {
        setPontos(resposta.content);
        setPaginaAtual(0);
        setEhUltimaPagina(ultimaPagina(resposta));
      })
      .catch((erro) => {
        setErro("Erro ao carregar pontos: " + mensagemDeErro(erro));
      }).finally(() => {
        setCarregando(false);
      });
  }, [buscaPonto]);

  useFocusEffect(useCallback(() => {
    carregarPrimeiraPagina();
  }, [carregarPrimeiraPagina]));

  async function carregarMaisPontos() {
    if (buscandoMais.current || ehUltimaPagina || carregando) {
      return;
    }

    buscandoMais.current = true;
    const proximaPagina = paginaAtual + 1;

    try {
      const resposta = await getPontos(proximaPagina, buscaPonto);
      setPontos((atual) => [...atual, ...resposta.content]);
      setPaginaAtual(proximaPagina);
      setEhUltimaPagina(ultimaPagina(resposta));
    } catch (error) {
      setErro("Erro ao carregar mais pontos: " + mensagemDeErro(error));
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
              <Text style={styles.title}>
                {editando
                  ? "Edição de item de doação"
                  : "Cadastro de item de doação"}
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
              />
              <Text>Selecione o tipo de doação:</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={tipo} onValueChange={setTipo}>
                  {Object.values(TIPOS_DOACAO).map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo.toUpperCase()} />
                  ))}
                </Picker>
              </View>
              <Text>Selecione o ponto de doação:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={pontoDestino ?? ""}
                  onValueChange={setPontoDestino}
                >
                  {pontos
                    .filter((ponto) => ponto.tiposDoacao.includes(tipo.toUpperCase()))
                    .map((ponto) => (
                      <Picker.Item
                        key={ponto.id}
                        label={ponto.nome}
                        value={ponto.id}
                      />
                    ))}
                </Picker>
              </View>

              <Pressable style={styles.button} onPress={validarESalvar}>
                <Text style={styles.buttonText}>
                  {editando ? "Salvar alterações" : "Cadastrar"}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, { backgroundColor: "#b4dd1e" }]}
                onPress={() =>
                  editando
                    ? navigation.goBack()
                    : navigation.navigate("TelaMinhasDoacoes")
                }
              >
                <Text style={styles.buttonText}>
                  {editando ? "Cancelar" : "Minhas Doações"}
                </Text>
              </Pressable>

              <View>
                {sucesso ? (
                  <Text style={styles.textSucesso}>{sucesso}</Text>
                ) : null}
                {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
              </View>

              <Text style={styles.title}>Pontos de coleta</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Buscar ponto de coleta"
                value={buscaPonto}
                onChangeText={setBuscaPonto}
              />
            </View>
          }
          ListEmptyComponent={
            <View style={styles.container}>
              {carregando ? (
                <ActivityIndicator size="large" color="#b4dd1e"/>
              ) :buscaPonto ? (
                <Text style={styles.textErro}>
                  Nenhum ponto de coleta encontrado para o tipo de doação
                  selecionado.
                </Text>
              ) : (
                <Text style={styles.textErro}>
                  Nenhum ponto de coleta encontrado, o servidor provavelmente se
                  encontra offline.
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
