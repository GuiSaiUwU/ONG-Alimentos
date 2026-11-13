package com.guisai.ong.alimentos.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guisai.ong.alimentos.api.entity.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
    
}
