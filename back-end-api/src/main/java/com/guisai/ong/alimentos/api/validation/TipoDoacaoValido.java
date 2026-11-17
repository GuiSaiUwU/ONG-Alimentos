package com.guisai.ong.alimentos.api.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = TipoDoacaoValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER, ElementType.RECORD_COMPONENT })
@Retention(RetentionPolicy.RUNTIME)
public @interface TipoDoacaoValido {
    String message() default "tipoItem deve ser um tipo de doação válido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
