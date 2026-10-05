import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { ItemDoacao, Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { salvarDoacao } from "../dados/doacoesStorage";
import { styles } from "../utils/styling";

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
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [pontoDestino, setPontoDestino] = useState<number | null>(null);
  const [tipo, setTipo] = useState<TIPOS_DOACAO>(TIPOS_DOACAO.ALIMENTOS);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const insets = useSafeAreaInsets();

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

    if (pontoDestino === null || pontoDestino === -1) {
      setErro("Selecione um ponto de doação válido");
      return;
    }

    const itemDoacao: ItemDoacao = {
      id: -1,
      criadoEm: 0 as unknown as Date, // valores que serão substituídos ao salvar
      nome,
      tipo,
      quantidade: Number(quantidade),
      pontoDestino: pontosMock.find((ponto) => ponto.id === pontoDestino)!,
    };

    await salvarDoacao(itemDoacao)
      .then(() => {
        setErro("");
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
    const pontosValidos = pontosMock.filter((ponto) =>
      ponto.tiposDeDoacao.includes(tipo),
    );

    if (pontosValidos.length > 0) {
      setPontoDestino(pontosValidos[0].id);
    } else {
      setPontoDestino(-1);
    }
  }, [tipo]);

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
          data={pontosMock}
          keyExtractor={(item) => item.id.toString()}
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
              <Text style={styles.title}>Cadastro de item de doação</Text>
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
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>
              </View>
              <Text>Selecione o ponto de doação:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={pontoDestino ?? -1}
                  onValueChange={setPontoDestino}
                >
                  {pontosMock
                    .filter((ponto) => ponto.tiposDeDoacao.includes(tipo))
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
                <Text style={styles.buttonText}>Cadastrar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, { backgroundColor: "#b4dd1e" }]}
                onPress={() => navigation.navigate("MinhasDoacoes")}
              >
                <Text style={styles.buttonText}>Minhas Doações</Text>
              </Pressable>

              <View>
                {sucesso ? <Text style={styles.textSucesso}>{sucesso}</Text> : null}
                {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
