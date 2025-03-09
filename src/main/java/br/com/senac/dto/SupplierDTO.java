package br.com.senac.dto;

import lombok.Data;

@Data
public class SupplierDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String cnpj;
    private String tradeName;
    private String corporateName;
    private String stateRegistration;
    private String category;
    private String productType;
    private String contractNumber;
    private String contractDate;
    private String paymentTerms;
} 