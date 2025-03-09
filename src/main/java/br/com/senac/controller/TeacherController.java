package br.com.senac.controller;

import br.com.senac.dto.TeacherDTO;
import br.com.senac.model.Teacher;
import br.com.senac.repository.TeacherRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    private final TeacherRepository teacherRepository;

    public TeacherController(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @PostMapping
    public ResponseEntity<TeacherDTO> create(@RequestBody TeacherDTO teacherDTO) {
        Teacher teacher = new Teacher();
        BeanUtils.copyProperties(teacherDTO, teacher);
        Teacher savedTeacher = teacherRepository.save(teacher);
        TeacherDTO responseDTO = new TeacherDTO();
        BeanUtils.copyProperties(savedTeacher, responseDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<TeacherDTO>> findAll() {
        List<TeacherDTO> teachers = teacherRepository.findAll().stream()
                .map(teacher -> {
                    TeacherDTO dto = new TeacherDTO();
                    BeanUtils.copyProperties(teacher, dto);
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDTO> findById(@PathVariable Long id) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    TeacherDTO dto = new TeacherDTO();
                    BeanUtils.copyProperties(teacher, dto);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherDTO> update(@PathVariable Long id, @RequestBody TeacherDTO teacherDTO) {
        return teacherRepository.findById(id)
                .map(existingTeacher -> {
                    BeanUtils.copyProperties(teacherDTO, existingTeacher);
                    existingTeacher.setId(id);
                    Teacher updatedTeacher = teacherRepository.save(existingTeacher);
                    TeacherDTO responseDTO = new TeacherDTO();
                    BeanUtils.copyProperties(updatedTeacher, responseDTO);
                    return ResponseEntity.ok(responseDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacherRepository.delete(teacher);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 