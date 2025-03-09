package br.com.senac.controller;

import br.com.senac.dto.StudentDTO;
import br.com.senac.model.Student;
import br.com.senac.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping
    public ResponseEntity<StudentDTO> create(@RequestBody StudentDTO studentDTO) {
        Student student = new Student();
        BeanUtils.copyProperties(studentDTO, student);
        Student savedStudent = studentRepository.save(student);
        StudentDTO responseDTO = new StudentDTO();
        BeanUtils.copyProperties(savedStudent, responseDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> findAll() {
        List<StudentDTO> students = studentRepository.findAll().stream()
                .map(student -> {
                    StudentDTO dto = new StudentDTO();
                    BeanUtils.copyProperties(student, dto);
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> findById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(student -> {
                    StudentDTO dto = new StudentDTO();
                    BeanUtils.copyProperties(student, dto);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> update(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        return studentRepository.findById(id)
                .map(existingStudent -> {
                    BeanUtils.copyProperties(studentDTO, existingStudent);
                    existingStudent.setId(id);
                    Student updatedStudent = studentRepository.save(existingStudent);
                    StudentDTO responseDTO = new StudentDTO();
                    BeanUtils.copyProperties(updatedStudent, responseDTO);
                    return ResponseEntity.ok(responseDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(student -> {
                    studentRepository.delete(student);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 