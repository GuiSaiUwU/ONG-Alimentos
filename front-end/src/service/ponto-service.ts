import { Ponto } from "../types";
import { getPaginado, PaginaResponse } from "./api";


export async function getPontos(pagina: number, filtro: string): Promise<Awaited<PaginaResponse<Ponto>>> {
    return (await getPaginado<Ponto>(`/pontos?page=${pagina}&busca=${filtro}`));
}