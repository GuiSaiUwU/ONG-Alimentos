export const SERVIDOR_URL = process.env.EXPO_PUBLIC_SERVIDOR_URL || "http://localhost:8080";
const API_URL = `${SERVIDOR_URL}/api/v1`;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function requisitarPaginado<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<Awaited<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    // Só quem manda corpo (POST e PUT) precisa avisar que o corpo é JSON.
    headers: options?.body ? { "Content-Type": "application/json" } : undefined,
  });

  if (!response.ok) {
    throw new ApiError(
      `Falha no ${API_URL}${endpoint} | status: ${response.status}`,
      response.status,
    );
  }

  // O DELETE responde sem corpo: nesse caso não há JSON para ler.
  const texto = await response.text();
  return (texto ? JSON.parse(texto) : undefined) as Awaited<T>;
}

export async function get<T>(endpoint: string): Promise<T> {
  return requisitarPaginado<T>(endpoint, { method: 'GET' });
}

export async function post<T>(endpoint: string, body: any): Promise<T> {
  return requisitarPaginado<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
}

export async function put<T>(endpoint: string, body: any): Promise<T> {
  return requisitarPaginado<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
}


export async function del<T>(endpoint: string): Promise<T> {
  return requisitarPaginado<T>(endpoint, { method: 'DELETE' });
}