package com.guisai.ong.alimentos.api.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.guisai.ong.alimentos.api.dto.DoacaoRequestDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String tipoItem;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private String pontoDestino;

    @Column(nullable = false)
    private LocalDateTime criadoEm;

    public static Doacao toEntity(DoacaoRequestDTO request) {
        Doacao doacao = new Doacao();
        doacao.setNome(request.nome());
        doacao.setTipoItem(request.tipoItem());
        doacao.setQuantidade(request.quantidade());
        doacao.setPontoDestino(request.pontoDestino());
        return doacao;
    }
}