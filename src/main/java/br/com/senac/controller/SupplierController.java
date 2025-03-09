package br.com.senac.controller;

import br.com.senac.dto.SupplierDTO;
import br.com.senac.model.Supplier;
import br.com.senac.repository.SupplierRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

    private final SupplierRepository supplierRepository;

    public SupplierController(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @PostMapping
    public ResponseEntity<SupplierDTO> create(@RequestBody SupplierDTO supplierDTO) {
        Supplier supplier = new Supplier();
        BeanUtils.copyProperties(supplierDTO, supplier);
        Supplier savedSupplier = supplierRepository.save(supplier);
        SupplierDTO responseDTO = new SupplierDTO();
        BeanUtils.copyProperties(savedSupplier, responseDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<SupplierDTO>> findAll() {
        List<SupplierDTO> suppliers = supplierRepository.findAll().stream()
                .map(supplier -> {
                    SupplierDTO dto = new SupplierDTO();
                    BeanUtils.copyProperties(supplier, dto);
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> findById(@PathVariable Long id) {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    SupplierDTO dto = new SupplierDTO();
                    BeanUtils.copyProperties(supplier, dto);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupplierDTO> update(@PathVariable Long id, @RequestBody SupplierDTO supplierDTO) {
        return supplierRepository.findById(id)
                .map(existingSupplier -> {
                    BeanUtils.copyProperties(supplierDTO, existingSupplier);
                    existingSupplier.setId(id);
                    Supplier updatedSupplier = supplierRepository.save(existingSupplier);
                    SupplierDTO responseDTO = new SupplierDTO();
                    BeanUtils.copyProperties(updatedSupplier, responseDTO);
                    return ResponseEntity.ok(responseDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    supplierRepository.delete(supplier);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 