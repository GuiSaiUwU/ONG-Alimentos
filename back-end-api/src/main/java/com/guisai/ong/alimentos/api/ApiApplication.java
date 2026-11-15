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
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES), -16.7048, -49.2861),
					new Ponto(null, "Instituto Coração Solidário", "Rua 15, 340, Setor Central",
							List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA, DIAS_SEMANA.SABADO),
							List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS, TIPOS_DOACAO.BRINQUEDOS), -16.6782,
							-49.2531),
					new Ponto(null, "Projeto Sementinha do Bem", "Avenida T-9, 1200, Setor Bueno",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE), -16.7041, -49.2745),
					new Ponto(null, "Rede do Bem Goiânia", "Rua 9, 1855, Setor Marista",
							List.of(DIAS_SEMANA.SEXTA, DIAS_SEMANA.SABADO),
							List.of(TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS, TIPOS_DOACAO.ROUPAS), -16.6993,
							-49.2642),
					new Ponto(null, "Casa da Solidariedade", "Rua Jamil Abrão, 645, Setor Rodoviário",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA,
									DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.BRINQUEDOS, TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS), -16.6648,
							-49.2562),
					new Ponto(null, "Estação do Bem", "Avenida Fued José Sebba, 1245, Jardim Goiás",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE, TIPOS_DOACAO.RACOES), -16.7046,
							-49.2385),
					new Ponto(null, "Ponto de Amor", "Rua T-14, 249, Setor Bueno",
							List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA),
							List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS, TIPOS_DOACAO.BRINQUEDOS), -16.7041,
							-49.2748),
					new Ponto(null, "Ação Solidária", "Avenida Circular, 768, Setor Pedro Ludovico",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS), -16.7043, -49.2675),
					new Ponto(null, "Mutirão do Bem", "Rua Campinas, 830, Setor Sol Nascente",
							List.of(DIAS_SEMANA.SABADO),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE, TIPOS_DOACAO.LIVROS), -16.7185,
							-49.2642),
					new Ponto(null, "SOS Solidariedade", "Avenida Antônio Fidelis, 800, Parque Amazônia",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA,
									DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS, TIPOS_DOACAO.HIGIENE), -16.7294,
							-49.2891),
					new Ponto(null, "Braços Abertos", "Avenida Goiás, 2001, Setor Central",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.BRINQUEDOS), -16.6780,
							-49.2553),
					new Ponto(null, "Mãos que Ajudam", "Praça Cívica, s/n, Setor Central",
							List.of(DIAS_SEMANA.DOMINGO),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS), -16.6812,
							-49.2562),
					new Ponto(null, "Amigos do Próximo", "Avenida do Cerrado, 999, Park Lozandes",
							List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA),
							List.of(TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS, TIPOS_DOACAO.HIGIENE), -16.6835,
							-49.2450),
					new Ponto(null, "Luz da Esperança", "Rua Pedro Brant, 2, Santo Hilário",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.SABADO),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES), -16.7298, -49.2645),
					new Ponto(null, "Semente do Amor", "Rua Santa Gertrudes, 329, Setor Coimbra",
							List.of(DIAS_SEMANA.SEXTA, DIAS_SEMANA.SABADO),
							List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.CALCADOS, TIPOS_DOACAO.BRINQUEDOS), -16.7047,
							-49.2893),
					new Ponto(null, "Coração de Mãe", "Avenida Mutirão, esquina com T-10, Setor Bueno",
							List.of(DIAS_SEMANA.TERCA, DIAS_SEMANA.QUINTA),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.HIGIENE, TIPOS_DOACAO.LIVROS), -16.7183,
							-49.2648),
					new Ponto(null, "Anjos da Guarda", "Avenida Central, s/n, Urias Magalhães",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.ROUPAS, TIPOS_DOACAO.BRINQUEDOS), -16.6645, -49.2568),
					new Ponto(null, "Guerreiros da Solidariedade", "Avenida C-171, Qd. 404, Lt. 13, Setor Nova Suíça",
							List.of(DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO),
							List.of(TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.RACOES, TIPOS_DOACAO.HIGIENE), -16.7042,
							-49.2896),
					new Ponto(null, "Força do Bem", "Avenida Oriente, Q2 L1, Setor Alto do Vale",
							List.of(DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.TERCA, DIAS_SEMANA.QUARTA,
									DIAS_SEMANA.QUINTA, DIAS_SEMANA.SEXTA),
							List.of(TIPOS_DOACAO.LIVROS, TIPOS_DOACAO.BRINQUEDOS, TIPOS_DOACAO.ROUPAS), -16.7296,
							-49.2238)));
		};
	}
}
