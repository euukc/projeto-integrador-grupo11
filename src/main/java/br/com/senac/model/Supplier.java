package br.com.senac.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Supplier extends LegalPerson {
    private String category;
    private String productType;
    private String contractNumber;
    private String contractDate;
    private String paymentTerms;
} 