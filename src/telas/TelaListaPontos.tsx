import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

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
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>{/* Cadastro de item de doação */}</View>
      <View style={styles.container}>
        <FlatList
          data={pontosMock}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PontoItem
              key={item.id}
              ponto={item}
              onPress={() =>
                navigation.navigate("TelaDetalhePonto", { pontoId: item.id })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: '#676767'
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 12,
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
});
