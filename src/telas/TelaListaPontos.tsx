import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, "TelaListaPontos">;

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
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

  function validarESalvar() {
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

    setErro("");
    setSucesso(`${nome} cadastrado com sucesso!`);
    // TODO: Salvar a doação uwu

    setPontoDestino(null);
    setNome("");
    setQuantidade("");
    setTipo(TIPOS_DOACAO.ALIMENTOS);
  }

  useEffect(() => {
    const pontosValidos = pontosMock.filter((ponto) =>
      ponto.tiposDeDoacao.includes(tipo)
    );

    if (pontosValidos.length > 0) {
      setPontoDestino(pontosValidos[0].id);
    } else {
      setPontoDestino(-1);
    }
  }, [tipo]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
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
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
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
                      <Picker.Item key={ponto.id} label={ponto.nome} value={ponto.id} />
                    ))}
                </Picker>
              </View>
              <Pressable style={styles.button} onPress={validarESalvar}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </Pressable>
              <View>
                {sucesso ? <Text style={styles.sucesso}>{sucesso}</Text> : null}
                {erro ? <Text style={styles.erro}>{erro}</Text> : null}
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#676767",
  },
  keyboardView: {
    flex: 1,
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: "#5c9dda",
    padding: 12,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  flatList: {
    flex: 1,
    backgroundColor: "#676767",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#fff",
    color: "#000000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    minHeight: 44,
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  item: {
    borderWidth: 1,
    borderColor: "#827d7d",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    minHeight: 44,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
  },
  endereco: {
    marginTop: 4,
    color: "#444",
  },
  erro: {
    color: "#e53e3e",
    fontSize: 14,
    alignSelf: "center",
  },
  sucesso: {
    color: "#38a169",
    fontSize: 14,
    alignSelf: "center",
  },
});