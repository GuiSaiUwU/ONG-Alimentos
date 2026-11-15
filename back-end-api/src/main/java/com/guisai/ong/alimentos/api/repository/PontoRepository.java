package com.guisai.ong.alimentos.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.guisai.ong.alimentos.api.entity.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
    @Query("""
                SELECT p
                            FROM Ponto p
                            WHERE UPPER(p.nome) LIKE %:filtro%
                                        OR UPPER(p.endereco) LIKE %:filtro%
            """)
    Page<Ponto> findByFiltro(String filtro, Pageable pageable);
}
