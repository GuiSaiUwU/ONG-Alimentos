import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPontos, ultimaPagina } from "../service/ponto-service";
import {
  postDoacao,
  putDoacao,
  getDoacaoById,
} from "../service/doacoes-service";
import { Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import { styles } from "../utils/styling";

type Props = NativeStackScreenProps<RootStackParamList, "CadastrarDoacao">;

export default function CadastrarDoacao({ navigation, route }: Props) {
  const doacaoId = route.params?.doacaoId;
  const editando = doacaoId !== undefined;
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipo, setTipo] = useState<TIPOS_DOACAO>(TIPOS_DOACAO.ALIMENTOS);
  const [pontoDestino, setPontoDestino] = useState<string | null>(null);
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: editando ? "Editar doação" : "Cadastrar doação",
    });
  }, [editando, navigation]);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const [doacao, primeiraPagina] = await Promise.all([
          editando ? getDoacaoById(doacaoId) : Promise.resolve(null),
          getPontos(0, ""),
        ]);
        let pontosCarregados = primeiraPagina.content;
        let pagina = 0;

        while (
          !ultimaPagina({
            ...primeiraPagina,
            page: { ...primeiraPagina.page, number: pagina },
          })
        ) {
          pagina += 1;
          const resposta = await getPontos(pagina, "");
          pontosCarregados = [...pontosCarregados, ...resposta.content];
          if (ultimaPagina(resposta)) {
            break;
          }
        }

        if (!ativo) {
          return;
        }

        setPontos(pontosCarregados);
        if (editando) {
          if (!doacao) {
            setErro("Doação não encontrada.");
          } else {
            setNome(doacao.nome);
            setQuantidade(String(doacao.quantidade));
            setTipo(doacao.tipoItem);
            setPontoDestino(
              pontosCarregados.find(
                (ponto) => ponto.nome === doacao.pontoDestino,
              )?.id ?? null,
            );
          }
        }
      } catch (error) {
        if (ativo) {
          setErro(`Erro ao carregar os dados: ${mensagemDeErro(error)}`);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregar();
    return () => {
      ativo = false;
    };
  }, [doacaoId, editando]);

  const pontosValidos = pontos.filter(
    (ponto) =>
      ponto.tiposDoacao.some(
        (tipoDoacao) =>
          tipoDoacao.toLocaleLowerCase() === tipo.toLocaleLowerCase(),
      ) || ponto.tiposDoacao.includes(tipo.toUpperCase()),
  );

  useEffect(() => {
    if (
      pontosValidos.length > 0 &&
      !pontosValidos.some((ponto) => ponto.id === pontoDestino)
    ) {
      setPontoDestino(pontosValidos[0].id);
    }
  }, [pontos, pontoDestino, tipo]);

  async function salvar() {
    setErro("");
    const nomeNormalizado = nome.trim();
    const quantidadeNumerica = Number(quantidade.replace(",", "."));
    const ponto = pontosValidos.find((item) => item.id === pontoDestino);

    if (!nomeNormalizado || !quantidade.trim() || !tipo) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (!Number.isFinite(quantidadeNumerica) || quantidadeNumerica <= 0) {
      setErro("Quantidade deve ser um número maior que zero.");
      return;
    }
    if (!ponto) {
      setErro("Selecione um ponto de doação válido para o tipo escolhido.");
      return;
    }

    const request = {
      nome: nomeNormalizado,
      tipoItem: tipo,
      quantidade: quantidadeNumerica,
      pontoDestino: ponto.nome,
    };

    setSalvando(true);
    try {
      if (editando) {
        await putDoacao(doacaoId, request);
      } else {
        await postDoacao(request);
      }
      navigation.goBack();
    } catch (error) {
      setErro(`Erro ao salvar a doação: ${mensagemDeErro(error)}`);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#b4dd1e" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {editando ? "Editar item de doação" : "Cadastrar item de doação"}
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
            keyboardType="decimal-pad"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <Text>Selecione o tipo de doação:</Text>
          <View style={styles.optionsContainer}>
            {Object.values(TIPOS_DOACAO).map((tipoDisponivel) => (
              <TouchableOpacity
                key={tipoDisponivel}
                style={[
                  styles.option,
                  tipo === tipoDisponivel && styles.optionSelected,
                ]}
                onPress={() => setTipo(tipoDisponivel)}
              >
                <Text
                  style={
                    tipo === tipoDisponivel
                      ? styles.optionTextSelected
                      : styles.optionText
                  }
                >
                  {tipoDisponivel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text>Selecione o ponto de doação:</Text>
          <View style={styles.optionsContainer}>
            {pontosValidos.map((pontoDisponivel) => (
              <TouchableOpacity
                key={pontoDisponivel.id}
                style={[
                  styles.option,
                  pontoDestino === pontoDisponivel.id && styles.optionSelected,
                ]}
                onPress={() => setPontoDestino(pontoDisponivel.id)}
              >
                <Text
                  style={
                    pontoDestino === pontoDisponivel.id
                      ? styles.optionTextSelected
                      : styles.optionText
                  }
                >
                  {pontoDisponivel.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {pontosValidos.length === 0 ? (
            <Text style={styles.textErro}>
              Nenhum ponto aceita este tipo de doação.
            </Text>
          ) : null}
          {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
          <Pressable style={styles.button} onPress={salvar} disabled={salvando}>
            {salvando ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>
                {editando ? "Salvar alterações" : "Cadastrar"}
              </Text>
            )}
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "#b4dd1e" }]}
            onPress={() => navigation.goBack()}
            disabled={salvando}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
