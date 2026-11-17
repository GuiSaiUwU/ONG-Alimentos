export interface PaginaResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export enum TIPOS_DOACAO {
    ALIMENTOS = "Alimentos",
    ROUPAS = "Roupas",
    LIVROS = "Livros",
    BRINQUEDOS = "Brinquedos",
    CALCADOS = "Calçados",
    HIGIENE = "Higiene",
    RACOES = "Rações"
}

export type DoacaoRequest = {
    nome: string;
    tipoItem: TIPOS_DOACAO;
    quantidade: number;
    pontoDestino: string;
}

export type ItemDoacao = {
    id: string;
    nome: string;
    tipoItem: TIPOS_DOACAO;
    quantidade: number;
    pontoDestino: string;
    criadoEm: string;
}


export enum DIAS_SEMANA {
    SABADO = "Sábado",
    DOMINGO = "Domingo",
    SEGUNDA = "Segunda-feira",
    TERCA = "Terça-feira",
    QUARTA = "Quarta-feira",
    QUINTA = "Quinta-feira",
    SEXTA = "Sexta-feira"
}


export type Ponto = {
    id: string;
    nome: string;
    endereco: string;
    diasQueAtende: string[];
    tiposDoacao: string[];
    latitude: number;
    longitude: number;
};

export type PontoRequest = {
    nome: string;
    endereco: string;
    diasQueAtende: string[];
    tiposDoacao: string[];
    latitude: number;
    longitude: number;
};


export type RootStackParamList = {
    TelaListaPontos: undefined;
    TelaMeusPontos: undefined;
    TelaDetalhePonto: { pontoId: string };
    TelaMinhasDoacoes: undefined;
    TelaDetalheDoacao: { doacaoId: string };
    CadastrarPonto: { pontoId?: string } | undefined;
    CadastrarDoacao: { doacaoId?: string } | undefined;
};