package br.com.senac.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Teacher extends PhysicalPerson {
    private String specialization;
    private String department;
    private String employeeId;
    private String qualification;
} 