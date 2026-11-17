package com.guisai.ong.alimentos.api.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.guisai.ong.alimentos.api.dto.DoacaoRequestDTO;
import com.guisai.ong.alimentos.api.dto.DoacaoResponseDTO;
import com.guisai.ong.alimentos.api.service.DoacaoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/doacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DoacaoController {
    private final DoacaoService doacaoService;

    @GetMapping("/filtro")
    public Page<DoacaoResponseDTO> findAll(
            @RequestParam(defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "criadoEm", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return doacaoService.findByFiltro(filtro, pageable);
    }

    @GetMapping("/{doacaoId}")
    public DoacaoResponseDTO findById(@PathVariable UUID doacaoId) {
        return doacaoService.findById(doacaoId);
    }

    @PostMapping
    public DoacaoResponseDTO save(@Valid @RequestBody DoacaoRequestDTO request) {
        return doacaoService.save(request);
    }

    @PutMapping("/{doacaoId}")
    public DoacaoResponseDTO update(
            @PathVariable UUID doacaoId,
            @Valid @RequestBody DoacaoRequestDTO request
    ) {
        return doacaoService.update(doacaoId, request);
    }

    @DeleteMapping("/{doacaoId}")
    public void delete(@PathVariable UUID doacaoId) {
        doacaoService.delete(doacaoId);
    }
}