package com.guisai.ong.alimentos.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import com.guisai.ong.alimentos.api.validation.TipoDoacaoValido;

public record DoacaoRequestDTO(
    @NotBlank String nome,
    @NotBlank @TipoDoacaoValido String tipoItem,
    @NotNull @Positive Integer quantidade,
    @NotBlank String pontoDestino
) {
}