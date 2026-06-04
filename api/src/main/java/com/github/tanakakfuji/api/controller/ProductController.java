package com.github.tanakakfuji.api.controller;

import com.github.tanakakfuji.api.domain.Product;
import com.github.tanakakfuji.api.form.ProductForm;
import com.github.tanakakfuji.api.repository.ProductRepository;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductForm form) {
        Product product = new ModelMapper().map(form, Product.class);
        product = productRepository.save(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productRepository.deleteById(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
