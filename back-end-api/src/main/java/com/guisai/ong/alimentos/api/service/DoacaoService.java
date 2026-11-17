package com.guisai.ong.alimentos.api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.guisai.ong.alimentos.api.dto.DoacaoRequestDTO;
import com.guisai.ong.alimentos.api.dto.DoacaoResponseDTO;
import com.guisai.ong.alimentos.api.entity.Doacao;
import com.guisai.ong.alimentos.api.repository.DoacaoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoacaoService {
    private final DoacaoRepository doacaoRepository;

    public Page<DoacaoResponseDTO> findByFiltro(String filtro, Pageable pageable) {
        return doacaoRepository.findByFiltro(filtro, pageable).map(DoacaoResponseDTO::toDto);
    }

    public DoacaoResponseDTO findById(UUID id) {
        Doacao doacao = buscarPorId(id);
        return DoacaoResponseDTO.toDto(doacao);
    }

    public DoacaoResponseDTO save(DoacaoRequestDTO request) {
        Doacao doacao = Doacao.toEntity(request);
        doacao.setCriadoEm(LocalDateTime.now());
        return DoacaoResponseDTO.toDto(doacaoRepository.save(doacao));
    }

    public DoacaoResponseDTO update(UUID id, DoacaoRequestDTO request) {
        Doacao doacao = buscarPorId(id);
        doacao.setNome(request.nome());
        doacao.setTipoItem(request.tipoItem());
        doacao.setQuantidade(request.quantidade());
        doacao.setPontoDestino(request.pontoDestino());
        return DoacaoResponseDTO.toDto(doacaoRepository.save(doacao));
    }

    public void delete(UUID id) {
        doacaoRepository.delete(buscarPorId(id));
    }

    private Doacao buscarPorId(UUID id) {
        return doacaoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada"));
    }
}