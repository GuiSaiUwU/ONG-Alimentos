package com.guisai.ong.alimentos.api.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/api/v1/pontos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*") // lol
public class PontoController {
    private final PontoService pontoService;

    @GetMapping("/filtro")
    public Page<PontoResponseDTO> findAll(
            @RequestParam(defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "nome", direction = Direction.ASC) Pageable pageable
    ) {
        return pontoService.findByFiltro(filtro, pageable);
    }

    @GetMapping("/{pontoId}")
    public PontoResponseDTO findById(@PathVariable UUID pontoId) {
        return pontoService.findById(pontoId);
    }

    @PostMapping
    public PontoResponseDTO save(@Valid @RequestBody PontoRequestDTO ponto) {
        return pontoService.save(ponto);
    }

    @PutMapping("/{pontoId}")
    public PontoResponseDTO update(@PathVariable UUID pontoId, @Valid @RequestBody PontoRequestDTO ponto) {
        return pontoService.update(pontoId, ponto);
    }

    @DeleteMapping("/{pontoId}")
    public void delete(@PathVariable UUID pontoId) {
        pontoService.delete(pontoId);
    }
}
