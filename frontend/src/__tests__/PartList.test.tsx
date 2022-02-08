import {render, screen} from "@testing-library/react";
import App from "../App";
import React from "react";
import {getProducts} from "../productsApiClient";
import {PartList} from "../PartList";
import {Product} from "../product";


const mockGetProducts:Product[] =[{id:1,name: "shiny new product1", quantity: 0},{id:2, name: "shiny new product2", quantity: 2}];
const mockUpdateQuantity =(product:Product)=>{return null;}
const mockSellQuantity =(product:Product, sellValue:number)=>{return null;}


describe("when I view the inventory", () => {
    it("should display the products", async () => {
        render(<PartList products={mockGetProducts} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>);

        expect(screen.getByText("Product")).toBeInTheDocument();
        expect(await screen.findByText("shiny new product1")).toBeInTheDocument();
        expect(await screen.findByText("shiny new product2")).toBeInTheDocument();
    });

    it("should display the products' quantities", async () => {
        render(<PartList products={mockGetProducts} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>);

        expect(await screen.findByText("Quantity: 0")).toBeInTheDocument();
        expect(await screen.findByText("Quantity: 2")).toBeInTheDocument();
    });
});