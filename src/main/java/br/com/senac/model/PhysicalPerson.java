package br.com.senac.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("PHYSICAL")
public class PhysicalPerson extends Person {
    private String cpf;
    private String rg;
    private String birthDate;
    private String gender;
} 