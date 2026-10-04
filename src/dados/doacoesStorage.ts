import AsyncStorage from "@react-native-async-storage/async-storage";
import { ItemDoacao } from "../types";

const CHAVE_DOACOES = "@ong-alimentos:doacoes";

export function listarDoacoes(): Promise<ItemDoacao[]> {
  return AsyncStorage.getItem(CHAVE_DOACOES).then((valor) => {
    if (valor) {
      return JSON.parse(valor);
    }
    return [];
  });
}

export function salvarDoacao(doacao: ItemDoacao): Promise<void> {
  return listarDoacoes().then((doacoes) => {
    const novaDoacao = {
      ...doacao,
      id: doacoes.length + 1,
      criadoEm: new Date(),
    };
    const doacoesAtualizadas = [...doacoes, novaDoacao];
    return AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(doacoesAtualizadas),
    );
  });
}
