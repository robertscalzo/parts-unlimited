import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {QuantityForm} from "../QuantityForm";
import {Product} from "../product";


describe("when I add inventory to a product", () => {
    const fakeProduct={id:1,name:"New Product",quantity:0}
    const mockUpdateQuantity =(product:Product)=>{return null;}
    const mockSellQuantity =(product:Product)=>{return null;}

    it("should display form fields", async () => {
        render(<QuantityForm product={fakeProduct} index={1} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>)

        expect(await screen.findByRole('spinbutton',{name:"Quantity to Add"})).toBeInTheDocument();
        expect(await screen.findByRole('spinbutton',{name:"Quantity to Sell"})).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: "Add"})).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: "Sell"})).toBeInTheDocument();
    });

    it("should fire callback when ADD form is filled out and submitted",async ()=>{
        render(<QuantityForm product={fakeProduct} index={1} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>)

        const quantityDropDown = screen.getByRole('spinbutton',{name:"Quantity to Add"});
        const addButton = screen.getByRole('button', {name: /add/i});

        userEvent.click(quantityDropDown);
        userEvent.type(quantityDropDown, '3');
        userEvent.click(addButton);

        expect(await screen.queryByText("3")).not.toBeInTheDocument()

    });
    it("should fire callback when SELL form is filled out and submitted",async ()=>{
        render(<QuantityForm product={fakeProduct} index={1} updateQuantity={mockUpdateQuantity} sellQuantity={mockSellQuantity}/>)

        const sellQuantityDropDown = screen.getByRole('spinbutton',{name:"Quantity to Sell"});
        const sellButton = screen.getByRole('button', {name: "Sell"})

        userEvent.click(sellQuantityDropDown);
        userEvent.type(sellQuantityDropDown, '3');
        userEvent.click(sellButton);

        expect(await screen.queryByText("3")).not.toBeInTheDocument()
    })
})