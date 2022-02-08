package org.asi.partsunlimited.controllers;

import org.asi.partsunlimited.Product;
import org.asi.partsunlimited.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class ProductController {
    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public @ResponseBody
    List<Product> getProducts() {
        return productService.getProducts();
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody String product) {
        var savedProduct = productService.addProduct(product);
        URI location = createResourceLocation("/products",savedProduct.getId());
        return ResponseEntity.created(location).body(savedProduct);
    }
    @PatchMapping("/products")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        var updatedProduct = productService.updateProduct(product);
        URI location = createResourceLocation("/products",updatedProduct.getId());
        return ResponseEntity.created(location).body(updatedProduct);
    }

    private URI createResourceLocation(String path, Long resourceId) {
        return ServletUriComponentsBuilder.fromCurrentRequestUri().port("8080").path(path)
                .buildAndExpand(resourceId).toUri();
    }
}