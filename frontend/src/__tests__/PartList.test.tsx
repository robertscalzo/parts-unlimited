import {render, screen} from "@testing-library/react";
import App from "../App";
import React from "react";
import {getProducts} from "../productsApiClient";
import {PartList} from "../PartList";
import {Product} from "../product";


const mockGetProducts:Product[] =[{id:1,name: "shiny new product1",modelNumber:7, quantity: 0},{id:2, name: "shiny new product2", modelNumber:8,quantity: 2}];
const mockUpdateQuantity =(product:Product)=>{return null;}
const mockSellQuantity =(product:Product, sellValue:number)=>{return null;}


describe("when I view the inventory", () => {
    it("should display the products in product column", async () => {
        render(<PartList products={mockGetProducts} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>);

        expect(screen.getByText("Product")).toBeInTheDocument();
            expect(await screen.findByText("Product")).toBeInTheDocument();
        expect(await screen.findByText("shiny new product1")).toBeInTheDocument();
        expect(await screen.findByText("shiny new product2")).toBeInTheDocument();
    });

    it("should display the products' quantities in table column", async () => {
        render(<PartList products={mockGetProducts} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>);
            expect(await screen.findByText("Quantity")).toBeInTheDocument();

        expect(await screen.findByText("0")).toBeInTheDocument();
        expect(await screen.findByText( "2")).toBeInTheDocument();
    });
    it('should display the products model numbers',async ()=>{
            render(<PartList products={mockGetProducts} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>);
            expect(await screen.findByText("Model Number")).toBeInTheDocument();

            expect(await screen.findByText("7")).toBeInTheDocument();
            expect(await screen.findByText("8")).toBeInTheDocument();
    })
});