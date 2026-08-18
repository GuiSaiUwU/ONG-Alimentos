import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { pontosMock } from "../dados/pontosMock";
import { Ponto, RootStackParamList } from "../types";

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
    <View style={styles.container}>
      <FlatList
        data={pontosMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => 
          <PontoItem
            key={item.id}
            ponto={item}
            onPress={() =>
              navigation.navigate("TelaDetalhePonto", { pontoId: item.id })
            }
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
