export enum TIPOS_DOACAO {
    ALIMENTOS = "Alimentos",
    ROUPAS = "Roupas",
    LIVROS = "Livros",
    BRINQUEDOS = "Brinquedos",
    CALCADOS = "Calçados",
    HIGIENE = "Higiene",
    RACOES = "Rações"
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
    id: number;
    nome: string;
    endereco: string;
    diasQueAtende: DIAS_SEMANA[];
    tiposDeDoacao: TIPOS_DOACAO[];
};


export type RootStackParamList = {
    TelaListaPontos: undefined;
    TelaDetalhePonto: { pontoId: number };
};