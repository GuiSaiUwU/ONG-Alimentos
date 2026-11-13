package com.guisai.ong.alimentos.api.dto;

import java.util.List;
import java.util.UUID;

import com.guisai.ong.alimentos.api.entity.Ponto;

public record PontoResponseDTO(
    UUID id,
    String nome,
    String endereco,
    List<String> diasQueAtende,
    List<String> tiposDoacao,
    Double latitude,
    Double longitude
) {

    public static PontoResponseDTO toDto(Ponto ponto) {
        return new PontoResponseDTO(
            ponto.getId(),
            ponto.getNome(),
            ponto.getEndereco(),
            ponto.getDiasQueAtende().stream().map(Enum::name).toList(),
            ponto.getTiposDoacao().stream().map(Enum::name).toList(),
            ponto.getLatitude(),
            ponto.getLongitude()
        );
    }
}
