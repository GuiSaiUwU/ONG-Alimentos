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

export function deletarDoacao(doacaoId: number): Promise<void> {
  return listarDoacoes().then((doacoes) => {
    const doacoesAtualizadas = doacoes.filter((item) => item.id !== doacaoId);
    return AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(doacoesAtualizadas),
    );
  });
}

export function atualizarDoacao(doacao: ItemDoacao): Promise<void> {
  return listarDoacoes().then((doacoes) => {
    if (!doacoes.some((item) => item.id === doacao.id)) {
      throw new Error("Doação não encontrada");
    }

    const doacaoAtualizada = doacoes.map((item) =>
      item.id === doacao.id ? { ...doacao, criadoEm: item.criadoEm } : item,
    );

    return AsyncStorage.setItem(
      CHAVE_DOACOES,
      JSON.stringify(doacaoAtualizada),
    );
  });
}
