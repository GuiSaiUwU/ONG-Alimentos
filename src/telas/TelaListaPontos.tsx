import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
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
  const [tipo, setTipo] = useState("");
  const [erro, setErro] = useState("");
  const insets = useSafeAreaInsets();

  function validarESalvar() {
    if (!nome || !quantidade || !tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    if (isNaN(Number(quantidade))) {
      setErro("Quantidade deve ser um número");
      return;
    }

    setErro("");
  }

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={{
        paddingTop: insets.top,
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
            <Picker
              selectedValue={tipo}
              onValueChange={setTipo}
            >
              {Object.values(TIPOS_DOACAO).map((tipo) => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>
          <Text style={styles.erro}>{erro}</Text>
          <Pressable style={styles.button} onPress={validarESalvar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#5c9dda",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14
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
});