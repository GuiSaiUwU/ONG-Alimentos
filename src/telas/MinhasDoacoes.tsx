import { memo, useState } from "react";
import { ItemDoacao } from "../types";
import { listarDoacoes } from "../dados/doacoesStorage";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { format } from 'date-fns';


const PontoMemo = memo(function PontoMemo({ ponto: itemDoacao }: { ponto: ItemDoacao }) {
  return (
    <View style={styles.pontoItem}>
        <Text style={styles.pontoNome}>{itemDoacao.nome}</Text>
        <Text style={styles.pontoEndereco}>Tipo: {itemDoacao.tipo}</Text>
        <Text style={styles.pontoEndereco}>Quantidade: {itemDoacao.quantidade}</Text>
        <Text style={styles.pontoEndereco}>Data: {format(itemDoacao.criadoEm, "dd/MM/yyyy HH:mm")}</Text>
        <Text style={styles.pontoEndereco}>Ponto de Destino: {itemDoacao.pontoDestino.nome}</Text>
    </View>
  )
});

export default function MinhasDoacoes() {
  const [doacoes, setDoacoes] = useState<ItemDoacao[]>([]);

  listarDoacoes().then((doacoes) => {
    setDoacoes(doacoes);
  });

  return (
    <SafeAreaView>
      <View>
        {doacoes.length === 0 ? (
          <View>
            <Text>Você ainda não fez nenhuma doação.</Text>
          </View>
        ) : (
          <FlatList
            style={styles.listContainer}
            data={doacoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PontoMemo ponto={item} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
