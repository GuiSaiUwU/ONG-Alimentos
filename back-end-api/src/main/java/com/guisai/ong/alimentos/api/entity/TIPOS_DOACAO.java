package com.guisai.ong.alimentos.api.entity;

public enum TIPOS_DOACAO {
    ALIMENTOS("Alimentos"),
    ROUPAS("Roupas"),
    LIVROS("Livros"),
    BRINQUEDOS("Brinquedos"),
    CALCADOS("Calçados"),
    HIGIENE("Higiene"),
    RACOES("Rações");

    private final String descricao;
    
    TIPOS_DOACAO(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
