import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITOS_KEY = "@ong-alimentos/favoritos";

export async function getFavoritos(): Promise<string[]> {
  const armazenados = await AsyncStorage.getItem(FAVORITOS_KEY);
  if (!armazenados) {
    return [];
  }

  const favoritos: unknown = JSON.parse(armazenados);
  if (!Array.isArray(favoritos) || !favoritos.every((id) => typeof id === "string")) {
    throw new Error("Os favoritos armazenados estão inválidos.");
  }

  return favoritos;
}

export async function adicionarFavorito(id: string): Promise<void> {
  const favoritos = await getFavoritos();
  if (!favoritos.includes(id)) {
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify([...favoritos, id]));
  }
}

export async function removerFavorito(id: string): Promise<void> {
  const favoritos = await getFavoritos();
  await AsyncStorage.setItem(
    FAVORITOS_KEY,
    JSON.stringify(favoritos.filter((favorito) => favorito !== id)),
  );
}
