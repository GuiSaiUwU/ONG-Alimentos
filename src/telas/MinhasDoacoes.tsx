import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ItemDoacao, TIPOS_DOACAO } from "../types";
import { listarDoacoes } from "../dados/doacoesStorage";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const PontoMemo = memo(function PontoMemo({
  itemDoacao,
}: {
  itemDoacao: ItemDoacao;
}) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("TelaDetalheDoacao", { doacaoId: itemDoacao.id });
      }}
      style={styles.pontoItem}
    >
      <Text style={styles.pontoNome}>{itemDoacao.nome}</Text>
      <Text style={styles.pontoEndereco}>Tipo: {itemDoacao.tipo}</Text>
      <Text style={styles.pontoEndereco}>
        Quantidade: {itemDoacao.quantidade}
      </Text>
      <Text style={styles.pontoEndereco}>
        Ponto de Destino: {itemDoacao.pontoDestino.nome}
      </Text>
    </Pressable>
  );
});

export default function MinhasDoacoes() {
  const [doacoes, setDoacoes] = useState<ItemDoacao[]>([]);
  const [textoBusca, setTextoBusca] = useState("");
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      listarDoacoes().then(setDoacoes);
    }, []),
  );

  const resumoDoacoes = useMemo(() => {
    const porTipo = doacoes.reduce<
      Record<string, { quantidade: number; doacoes: number }>
    >((resumo, doacao) => {
      const tipoAtual = resumo[doacao.tipo] ?? { quantidade: 0, doacoes: 0 };

      resumo[doacao.tipo] = {
        quantidade: tipoAtual.quantidade + doacao.quantidade,
        doacoes: tipoAtual.doacoes + 1,
      };

      return resumo;
    }, {});

    Object.entries(TIPOS_DOACAO).forEach(([tipo, descricao]) => {
      if (!porTipo[descricao]) {
        porTipo[descricao] = { quantidade: 0, doacoes: 0 };
      }
    });

    return Object.entries(porTipo);
  }, [doacoes]);

  const doacoesFiltradas = useMemo(() => {
    const busca = textoBusca.toLocaleLowerCase();

    if (!busca) {
      return doacoes;
    }

    return doacoes.filter((doacao) =>
      doacao.tipo.toLocaleLowerCase().includes(busca),
    );
  }, [doacoes, textoBusca]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={[
            styles.listContainer,
            {
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
              paddingTop: insets.top / 2,
            },
          ]}
          data={doacoesFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PontoMemo itemDoacao={item} />}
          ListHeaderComponent={
            <>
              <Text style={styles.pontoNome}>
                Resumo: {doacoes.length} doações realizadas
              </Text>
              <FlatList
                data={resumoDoacoes}
                keyExtractor={([tipo]) => tipo}
                renderItem={({ item: [tipo, resumo] }) => (
                  <Text style={styles.pontoEndereco}>
                    {resumo.doacoes === 0 ? (
                      `Nenhuma doação de ${tipo} cadastrada`
                    ) : (
                      <>
                        {tipo}: {resumo.quantidade} unidades em {resumo.doacoes}{" "}
                        {resumo.doacoes === 1 ? "doação" : "doações"}{" "}
                      </>
                    )}
                  </Text>
                )}
                ListEmptyComponent={
                  <Text style={styles.pontoNome}>
                    Ainda não há doações para resumir.
                  </Text>
                }
              />
              <TextInput
                style={[styles.textInput, { marginTop: 16 }]}
                placeholder="Buscar por tipo de item"
                value={textoBusca}
                onChangeText={setTextoBusca}
                autoCorrect={false}
                returnKeyType="done"
              />
            </>
          }
          ListEmptyComponent={
            doacoes.length === 0 ? (
              <Text>Você ainda não fez nenhuma doação.</Text>
            ) : (
              <Text>Nenhuma doação encontrada para "{textoBusca}".</Text>
            )
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
