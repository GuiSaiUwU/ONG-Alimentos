package com.guisai.ong.alimentos.api.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.guisai.ong.alimentos.api.dto.PontoRequestDTO;
import com.guisai.ong.alimentos.api.dto.PontoResponseDTO;
import com.guisai.ong.alimentos.api.service.PontoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pontos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*") // lol
public class PontoController {
    private final PontoService pontoService;

    @GetMapping
    public Page<PontoResponseDTO> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sort
    ) {
        return pontoService.findAll(PageRequest.of(page, Math.max(1, Math.min(size, 50)), Sort.by(sort)));
    }

    @GetMapping("/{pontoId}")
    public PontoResponseDTO findById(@PathVariable Long pontoId) {
        return pontoService.findById(pontoId);
    }

    @PostMapping
    public PontoResponseDTO save(@Valid @RequestBody PontoRequestDTO ponto) {
        return pontoService.save(ponto);
    }

    @PutMapping("/{pontoId}")
    public PontoResponseDTO update(@PathVariable Long pontoId, @Valid @RequestBody PontoRequestDTO ponto) {
        return pontoService.update(pontoId, ponto);
    }

    @DeleteMapping("/{pontoId}")
    public void delete(@PathVariable Long pontoId) {
        pontoService.delete(pontoId);
    }
}
