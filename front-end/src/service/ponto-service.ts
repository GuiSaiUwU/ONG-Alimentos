import { PontoRequest, Ponto, PaginaResponse } from "../types";
import { del, get, post, put } from "./api";



export function getPontos(pagina: number, filtro: string): Promise<PaginaResponse<Ponto>> {
  return get<PaginaResponse<Ponto>>(`/pontos/filtro?page=${pagina}&size=10&filtro=${filtro}`);
}

export function getByPontoId(id: string): Promise<Ponto> {
  return get<Ponto>(`/pontos/${id}`);
}

export function postPonto(ponto: PontoRequest): Promise<PaginaResponse<Ponto>> {
  return post<PaginaResponse<Ponto>>(`/pontos`, ponto);
}

export function putPonto(id: string, ponto: PontoRequest): Promise<PaginaResponse<Ponto>> {
  return put<PaginaResponse<Ponto>>(`/pontos/${id}`, ponto);
}

export function deletePonto(id: string): Promise<PaginaResponse<void>> {
  return del<PaginaResponse<void>>(`/pontos/${id}`);
}

export function ultimaPagina(Page: PaginaResponse<Ponto>): boolean {
  return Page.page.number + 1 >= Page.page.totalPages;
}