package com.github.tanakakfuji.api.repository;

import com.github.tanakakfuji.api.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
