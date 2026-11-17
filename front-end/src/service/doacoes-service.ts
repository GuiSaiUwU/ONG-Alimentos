import { del, get, post, put } from "./api";
import { DoacaoRequest, ItemDoacao, PaginaResponse } from "../types";

export function getDoacoes(
  pagina: number,
  filtro: string,
): Promise<PaginaResponse<ItemDoacao>> {
  const params = new URLSearchParams({
    page: String(pagina),
    size: "10",
    filtro,
  });
  return get<PaginaResponse<ItemDoacao>>(
    `/doacoes/filtro?${params.toString()}`,
  );
}

export function getDoacaoById(id: string): Promise<ItemDoacao> {
  return get<ItemDoacao>(`/doacoes/${id}`);
}

export function postDoacao(doacao: DoacaoRequest): Promise<ItemDoacao> {
  return post<ItemDoacao>("/doacoes", doacao);
}

export function putDoacao(
  id: string,
  doacao: DoacaoRequest,
): Promise<ItemDoacao> {
  return put<ItemDoacao>(`/doacoes/${id}`, doacao);
}

export function deleteDoacao(id: string): Promise<void> {
  return del<void>(`/doacoes/${id}`);
}

export function ultimaPaginaDoacoes(
  pagina: PaginaResponse<ItemDoacao>,
): boolean {
  return pagina.page.number + 1 >= pagina.page.totalPages;
}
