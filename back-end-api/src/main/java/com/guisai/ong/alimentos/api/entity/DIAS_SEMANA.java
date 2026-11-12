package com.guisai.ong.alimentos.api.entity;

public enum DIAS_SEMANA {
    SABADO("Sábado"),
    DOMINGO("Domingo"),
    SEGUNDA("Segunda-feira"),
    TERCA("Terça-feira"),
    QUARTA("Quarta-feira"),
    QUINTA("Quinta-feira"),
    SEXTA("Sexta-feira");

    private final String descricao;

    DIAS_SEMANA(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}