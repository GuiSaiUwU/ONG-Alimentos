import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../types";
import { DIAS_SEMANA, PontoRequest, TIPOS_DOACAO } from "../types";
import { getByPontoId, postPonto, putPonto } from "../service/ponto-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { styles } from "../utils/styling";


type Props = NativeStackScreenProps<RootStackParamList, "CadastrarPonto">;

export default function CadastrarPonto({ navigation, route }: Props) {
    const pontoId = route.params?.pontoId;
    const editando = pontoId !== undefined;
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [diasQueAtende, setDiasQueAtende] = useState<string[]>([]);
    const [tiposDoacao, setTiposDoacao] = useState<string[]>([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(editando);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
      navigation.setOptions({ title: editando ? "Editar ponto" : "Cadastrar ponto" });
    }, [editando, navigation]);

    useEffect(() => {
      if (!pontoId) {
        return;
      }

      getByPontoId(pontoId)
        .then((ponto) => {
          setNome(ponto.nome);
          setEndereco(ponto.endereco);
          setDiasQueAtende(ponto.diasQueAtende);
          setTiposDoacao(ponto.tiposDoacao);
          setLatitude(String(ponto.latitude));
          setLongitude(String(ponto.longitude));
        })
        .catch((error) => {
          setErro(`Erro ao carregar o ponto: ${mensagemDeErro(error)}`);
        })
        .finally(() => setCarregando(false));
    }, [pontoId]);

    function alternarSelecao(
      valor: string,
      selecionados: string[],
      atualizar: (valores: string[]) => void,
    ) {
      atualizar(
        selecionados.includes(valor)
          ? selecionados.filter((item) => item !== valor)
          : [...selecionados, valor],
      );
    }

    async function salvar() {
      setErro("");
      setSucesso("");

      if (!nome.trim() || !endereco.trim()) {
        setErro("Preencha o nome e o endereço.");
        return;
      }
      if (diasQueAtende.length === 0 || tiposDoacao.length === 0) {
        setErro("Selecione ao menos um dia e um tipo de doação.");
        return;
      }

      if (!latitude.trim() || !longitude.trim()) {
        setErro("Preencha a latitude e a longitude.");
        return;
      }

      const latitudeNumerica = Number(latitude.replace(",", "."));
      const longitudeNumerica = Number(longitude.replace(",", "."));
      if (
        !Number.isFinite(latitudeNumerica) ||
        !Number.isFinite(longitudeNumerica) ||
        latitudeNumerica < -90 ||
        latitudeNumerica > 90 ||
        longitudeNumerica < -180 ||
        longitudeNumerica > 180
      ) {
        setErro("Informe latitude e longitude válidas.");
        return;
      }

      const ponto: PontoRequest = {
        nome: nome.trim(),
        endereco: endereco.trim(),
        diasQueAtende,
        tiposDoacao,
        latitude: latitudeNumerica,
        longitude: longitudeNumerica,
      };

      setSalvando(true);
      try {
        if (pontoId !== undefined) {
          await putPonto(pontoId, ponto);
          navigation.goBack();
        } else {
          await postPonto(ponto);
          navigation.goBack();
        }
      } catch (error) {
        setErro(`Erro ao salvar o ponto: ${mensagemDeErro(error)}`);
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
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>
              {editando ? "Editar ponto de coleta" : "Cadastrar ponto de coleta"}
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Nome do ponto"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
            />

            <Text style={styles.fieldLabel}>Dias de atendimento</Text>
            <View style={styles.optionsContainer}>
              {Object.entries(DIAS_SEMANA).map(([valor, label]) => (
                <Pressable
                  key={valor}
                  style={[
                    styles.option,
                    diasQueAtende.includes(valor) && styles.optionSelected,
                  ]}
                  onPress={() => alternarSelecao(valor, diasQueAtende, setDiasQueAtende)}
                >
                  <Text style={diasQueAtende.includes(valor) ? styles.optionTextSelected : styles.optionText}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Tipos de doação aceitos</Text>
            <View style={styles.optionsContainer}>
              {Object.entries(TIPOS_DOACAO).map(([valor, label]) => (
                <Pressable
                  key={valor}
                  style={[
                    styles.option,
                    tiposDoacao.includes(valor) && styles.optionSelected,
                  ]}
                  onPress={() => alternarSelecao(valor, tiposDoacao, setTiposDoacao)}
                >
                  <Text style={tiposDoacao.includes(valor) ? styles.optionTextSelected : styles.optionText}>
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Latitude"
              keyboardType="decimal-pad"
              value={latitude}
              onChangeText={setLatitude}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Longitude"
              keyboardType="decimal-pad"
              value={longitude}
              onChangeText={setLongitude}
            />

            <Pressable style={styles.button} onPress={salvar} disabled={salvando}>
              {salvando ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>
                  {editando ? "Salvar alterações" : "Cadastrar ponto"}
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

            {sucesso ? <Text style={styles.textSucesso}>{sucesso}</Text> : null}
            {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );

}

function mensagemDeErro(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}