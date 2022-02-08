package org.asi.partsunlimited;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int modelNumber;

    private Integer quantity;

    public Product(String name, Integer quantity, Integer modelNumber) {
        this.name = name;
        this.quantity = quantity;
        this.modelNumber=modelNumber;
    }
    public Product(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}
