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
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { atualizarDoacao, listarDoacoes, salvarDoacao } from "../dados/doacoesStorage";
import { getPontos, ultimaPagina } from "../service/ponto-service";
import { ItemDoacao, Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
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
    navigation.setOptions({ title: editando ? "Editar doação" : "Cadastrar doação" });
  }, [editando, navigation]);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const [doacoes, primeiraPagina] = await Promise.all([
          editando ? listarDoacoes() : Promise.resolve([]),
          getPontos(0, ""),
        ]);
        let pontosCarregados = primeiraPagina.content;
        let pagina = 0;

        while (!ultimaPagina({ ...primeiraPagina, page: { ...primeiraPagina.page, number: pagina } })) {
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
          const doacao = doacoes.find((item) => item.id === doacaoId);
          if (!doacao) {
            setErro("Doação não encontrada.");
          } else {
            setNome(doacao.nome);
            setQuantidade(String(doacao.quantidade));
            setTipo(doacao.tipo);
            setPontoDestino(doacao.pontoDestino.id);
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

  const pontosValidos = pontos.filter((ponto) =>
    ponto.tiposDoacao.some(
      (tipoDoacao) => tipoDoacao.toLocaleLowerCase() === tipo.toLocaleLowerCase(),
    ) ||
    ponto.tiposDoacao.includes(tipo.toUpperCase()),
  );

  useEffect(() => {
    if (pontosValidos.length > 0 && !pontosValidos.some((ponto) => ponto.id === pontoDestino)) {
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

    const itemDoacao: ItemDoacao = {
      id: doacaoId ?? -1,
      criadoEm: new Date(),
      nome: nomeNormalizado,
      tipo,
      quantidade: quantidadeNumerica,
      pontoDestino: ponto,
    };

    setSalvando(true);
    try {
      if (editando) {
        await atualizarDoacao(itemDoacao);
      } else {
        await salvarDoacao(itemDoacao);
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
          <View style={styles.pickerContainer}>
            <Picker selectedValue={tipo} onValueChange={setTipo}>
              {Object.values(TIPOS_DOACAO).map((tipoDisponivel) => (
                <Picker.Item
                  key={tipoDisponivel}
                  label={tipoDisponivel}
                  value={tipoDisponivel}
                />
              ))}
            </Picker>
          </View>
          <Text>Selecione o ponto de doação:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={pontoDestino ?? ""}
              onValueChange={setPontoDestino}
            >
              {pontosValidos.map((pontoDisponivel) => (
                <Picker.Item
                  key={pontoDisponivel.id}
                  label={pontoDisponivel.nome}
                  value={pontoDisponivel.id}
                />
              ))}
            </Picker>
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
