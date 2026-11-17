package com.guisai.ong.alimentos.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.guisai.ong.alimentos.api.entity.Doacao;

public record DoacaoResponseDTO(
    UUID id,
    String nome,
    String tipoItem,
    Integer quantidade,
    String pontoDestino,
    LocalDateTime criadoEm
) {
    public static DoacaoResponseDTO toDto(Doacao doacao) {
        return new DoacaoResponseDTO(
            doacao.getId(),
            doacao.getNome(),
            doacao.getTipoItem(),
            doacao.getQuantidade(),
            doacao.getPontoDestino(),
            doacao.getCriadoEm()
        );
    }
}