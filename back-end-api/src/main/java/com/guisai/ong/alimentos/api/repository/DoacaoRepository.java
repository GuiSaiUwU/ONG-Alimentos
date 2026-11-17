package com.guisai.ong.alimentos.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.guisai.ong.alimentos.api.entity.Doacao;

public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {
    @Query("""
        SELECT d
        FROM Doacao d
        WHERE UPPER(d.tipoItem) LIKE CONCAT('%', UPPER(:filtro), '%')
        OR UPPER(d.nome) LIKE CONCAT('%', UPPER(:filtro), '%')
        """)
    Page<Doacao> findByFiltro(String filtro, Pageable pageable);
}