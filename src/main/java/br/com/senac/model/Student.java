package br.com.senac.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Student extends PhysicalPerson {
    private String studentId;
    private String course;
    private String semester;
    private String enrollmentDate;
    private String status;
} 