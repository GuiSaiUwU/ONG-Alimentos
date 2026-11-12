package com.guisai.ong.alimentos.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.guisai.ong.alimentos.api.dto.PontoRequestDTO;
import com.guisai.ong.alimentos.api.dto.PontoResponseDTO;
import com.guisai.ong.alimentos.api.entity.Ponto;
import com.guisai.ong.alimentos.api.repository.PontoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PontoService {
    private final PontoRepository pontoRepository;

    public Page<PontoResponseDTO> findAll(Pageable pageable) {
        Page<Ponto> pontos = pontoRepository.findAll(pageable);

        return pontos.map(PontoResponseDTO::toDto);
    }

    public PontoResponseDTO findById(Long id) {
        var ponto = pontoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado"));

        return PontoResponseDTO.toDto(ponto);
    }

    public PontoResponseDTO save(PontoRequestDTO ponto) {
        Ponto pontoSalvo = pontoRepository.save(Ponto.toEntity(ponto));
        return PontoResponseDTO.toDto(pontoSalvo);
    }

    public void delete(Long id) {
        pontoRepository.deleteById(id);
    }

    public PontoResponseDTO update(Long id, PontoRequestDTO ponto) {
        var pontoExistente = pontoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado"));

        Ponto novoPonto = Ponto.toEntity(ponto);
        pontoExistente.setNome(novoPonto.getNome());
        pontoExistente.setEndereco(novoPonto.getEndereco());
        pontoExistente.setDiasQueAtende(novoPonto.getDiasQueAtende());
        pontoExistente.setTiposDoacao(novoPonto.getTiposDoacao());
        pontoExistente.setLatitude(novoPonto.getLatitude());
        pontoExistente.setLongitude(novoPonto.getLongitude());

        Ponto pontoAtualizado = pontoRepository.save(pontoExistente);
        return PontoResponseDTO.toDto(pontoAtualizado);
    }
}
