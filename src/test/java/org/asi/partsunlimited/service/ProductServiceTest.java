package org.asi.partsunlimited.service;

import org.asi.partsunlimited.Product;
import org.asi.partsunlimited.repositories.ProductRepository;
import org.asi.partsunlimited.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class ProductServiceTest {

    @MockBean
    ProductRepository productRepository;

    ProductService productService;

    @BeforeEach
    void setUp() {
        productService = new ProductService(productRepository);
    }

    @Test
    void shouldRetrieveAllProducts(){
        List<Product> expectedProducts = List.of(new Product(1L, "first-product", 7,0),
                new Product(2L, "second-product",7, 0));
        when(productRepository.findAll()).thenReturn(expectedProducts);

        List<Product> actualProducts = productService.getProducts();

        assertThat(actualProducts).isEqualTo(expectedProducts);
    }

    @Test
    void shouldCreateANewProductWithQuantityAndModelNumberZero(){
        Product productToSave = new Product("new-product" ,0);

        productService.addProduct("new-product");

        verify(productRepository).save(productToSave);
    }
    @Test
    void shouldUpdateAnExistingProduct_WithNewQuantity(){
        Product oldProduct = new Product(1L,"new-product", 7,0);
        productService.addProduct("new-product");

        Product updatedProduct = new Product(1L,"new-product", 7,3);
        updatedProduct = productService.updateProduct(updatedProduct);
        assertThat(updatedProduct).isNotEqualTo(oldProduct);
    }
}
