import { DIAS_SEMANA, Ponto, TIPOS_DOACAO } from "../types";

export const pontosMock: Ponto[] = [
  {
    id: 1,
    nome: "Ponto de Doação A",
    endereco: "Rua A, 123",
    diasQueAtende: [DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS],
  },
  {
    id: 2,
    nome: "Ponto de Doação B",
    endereco: "Rua B, 456",
    diasQueAtende: [DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS],
  },
  {
    id: 3,
    nome: "Ponto de Doação C",
    endereco: "Avenida Central, 789",
    diasQueAtende: [DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA],
    tiposDeDoacao: [TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.BRINQUEDOS],
  },
  {
    id: 4,
    nome: "Centro Comunitário Sul",
    endereco: "Rua das Flores, 12",
    diasQueAtende: [DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE],
  },
  {
    id: 5,
    nome: "Igreja Matriz",
    endereco: "Praça da Sé, s/n",
    diasQueAtende: [DIAS_SEMANA.DOMINGO],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS],
  },
  {
    id: 6,
    nome: "Ong Vida Nova",
    endereco: "Alameda dos Anjos, 45",
    diasQueAtende: [DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA],
    tiposDeDoacao: [TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS],
  },
  {
    id: 7,
    nome: "Posto de Coleta Norte",
    endereco: "Rua Nova, 999",
    diasQueAtende: [DIAS_SEMANA.SABADO],
    tiposDeDoacao: [TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.HIGIENE],
  },
  {
    id: 8,
    nome: "Espaço Solidário",
    endereco: "Av. Perimetral, 2020",
    diasQueAtende: [DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.SEXTA],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES],
  },
];