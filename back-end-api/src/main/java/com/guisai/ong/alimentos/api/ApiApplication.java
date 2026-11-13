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
			
			pontoRepository.saveAll(List.of(
				new Ponto(null, "Ponto de Doação A", "Rua A, 123",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS), -16.6869, -49.2648),
				new Ponto(null, "Ponto de Doação B", "Rua B, 456",
					List.of(DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO),
					List.of(TIPOS_DOACAO.ALIMENTOS), -16.6799, -49.2550),
				new Ponto(null, "Ponto de Doação C", "Avenida Central, 789",
					List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA),
					List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.BRINQUEDOS), -16.6735, -49.2436),
				new Ponto(null, "Centro Comunitário Sul", "Rua das Flores, 12",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA,
						DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE), -16.7045, -49.2673),
				new Ponto(null, "Igreja Matriz", "Praça da Sé, s/n",
					List.of(DIAS_SEMANA.DOMINGO),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS),
					-16.6796, -49.2568),
				new Ponto(null, "Ong Vida Nova", "Alameda dos Anjos, 45",
					List.of(DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS), -16.7187, -49.2647),
				new Ponto(null, "Posto de Coleta Norte", "Rua Nova, 999",
					List.of(DIAS_SEMANA.SABADO),
					List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.HIGIENE), -16.6500, -49.2564),
				new Ponto(null, "Espaço Solidário", "Av. Perimetral, 2020",
					List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.SEXTA),
					List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES), -16.7048, -49.2861)
			));
		};
	}
}
