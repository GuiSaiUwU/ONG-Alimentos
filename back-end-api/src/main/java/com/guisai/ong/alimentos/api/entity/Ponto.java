package com.guisai.ong.alimentos.api.entity;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.guisai.ong.alimentos.api.dto.PontoRequestDTO;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;
    
    @ElementCollection(targetClass = DIAS_SEMANA.class, fetch = FetchType.EAGER)
	@JoinTable(name = "tb_dias_semana", joinColumns = @JoinColumn(name = "ponto_id"))
	@Column(name = "dias", nullable = false)
	@Enumerated(EnumType.STRING)
    private List<DIAS_SEMANA> diasQueAtende;


    @ElementCollection(targetClass = TIPOS_DOACAO.class, fetch = FetchType.EAGER)
    @JoinTable(name = "tb_tipos_doacao", joinColumns = @JoinColumn(name = "ponto_id"))
    @Column(name = "tipos", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<TIPOS_DOACAO> tiposDoacao;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;


    //
    public static Ponto toEntity(PontoRequestDTO pontoRequestDTO) {
        Ponto ponto = new Ponto();
        ponto.setNome(pontoRequestDTO.nome());
        ponto.setEndereco(pontoRequestDTO.endereco());
        ponto.setDiasQueAtende(pontoRequestDTO.diasQueAtende().stream()
                .map(DIAS_SEMANA::valueOf)
                .collect(Collectors.toList()));
        ponto.setTiposDoacao(pontoRequestDTO.tiposDoacao().stream()
                .map(TIPOS_DOACAO::valueOf)
                .collect(Collectors.toList()));
        ponto.setLatitude(pontoRequestDTO.latitude());
        ponto.setLongitude(pontoRequestDTO.longitude());
        return ponto;
    }
}
