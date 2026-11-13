package com.guisai.ong.alimentos.api.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record PontoRequestDTO(
    @NotBlank String nome,
    @NotBlank String endereco,
    @NotEmpty List<String> diasQueAtende,
    @NotEmpty List<String> tiposDoacao,
    Double latitude,
    Double longitude
) {
}
