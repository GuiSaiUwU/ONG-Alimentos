package com.guisai.ong.alimentos.api.validation;

import java.util.Arrays;

import com.guisai.ong.alimentos.api.entity.TIPOS_DOACAO;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TipoDoacaoValidator implements ConstraintValidator<TipoDoacaoValido, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        return Arrays.stream(TIPOS_DOACAO.values())
            .anyMatch(tipo -> tipo.getDescricao().equals(value));
    }
}
