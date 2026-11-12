package com.guisai.ong.alimentos.api;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.guisai.ong.alimentos.api.entity.Ponto;
import com.guisai.ong.alimentos.api.entity.DIAS_SEMANA;
import com.guisai.ong.alimentos.api.entity.TIPOS_DOACAO;
import com.guisai.ong.alimentos.api.repository.PontoRepository;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication
@OpenAPIDefinition
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	CommandLineRunner inicializarPontos(PontoRepository pontoRepository) {
		return args -> {
			List<Ponto> pontosExistentes = pontoRepository.findAll();
			if (!pontosExistentes.isEmpty())
				return;
			
			// TODO: Colocar coordenadas reais para cada ponto de doação (long e lat)
			pontoRepository.saveAll(List.of(
				new Ponto(null, "Ponto de Doação A", "Rua A, 123",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS), 0.0, 0.0),
				new Ponto(null, "Ponto de Doação B", "Rua B, 456",
					List.of(DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO),
					List.of(TIPOS_DOACAO.ALIMENTOS), 0.0, 0.0),
				new Ponto(null, "Ponto de Doação C", "Avenida Central, 789",
					List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA),
					List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.BRINQUEDOS), 0.0, 0.0),
				new Ponto(null, "Centro Comunitário Sul", "Rua das Flores, 12",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA,
						DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE), 0.0, 0.0),
				new Ponto(null, "Igreja Matriz", "Praça da Sé, s/n",
					List.of(DIAS_SEMANA.DOMINGO),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS),
					0.0, 0.0),
				new Ponto(null, "Ong Vida Nova", "Alameda dos Anjos, 45",
					List.of(DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS), 0.0, 0.0),
				new Ponto(null, "Posto de Coleta Norte", "Rua Nova, 999",
					List.of(DIAS_SEMANA.SABADO),
					List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.HIGIENE), 0.0, 0.0),
				new Ponto(null, "Espaço Solidário", "Av. Perimetral, 2020",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES), 0.0, 0.0)
			));
		};
	}
}
