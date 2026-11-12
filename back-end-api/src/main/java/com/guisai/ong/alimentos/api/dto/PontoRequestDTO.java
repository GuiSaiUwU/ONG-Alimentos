package com.guisai.ong.alimentos.api.dto;

import java.util.List;

public record PontoRequestDTO(
    String nome,
    String endereco,
    List<String> diasQueAtende,
    List<String> tiposDoacao,
    Double latitude,
    Double longitude
) {
    
}
