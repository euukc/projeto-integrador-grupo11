package br.com.senac.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("LEGAL")
public class LegalPerson extends Person {
    private String cnpj;
    private String tradeName;
    private String corporateName;
    private String stateRegistration;
} 