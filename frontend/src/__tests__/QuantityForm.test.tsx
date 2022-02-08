import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {QuantityForm} from "../QuantityForm";
import {Product} from "../product";


describe("when I add inventory to a product", () => {
    const fakeProduct={id:1,name:"New Product",quantity:0}
    const mockUpdateQuantity =(product:Product)=>{return null;}

    it("should display form fields", async () => {
        render(<QuantityForm product={fakeProduct} index={1} updateQuantity={mockUpdateQuantity}/>)

        expect(await screen.findByRole('spinbutton')).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: "Add"})).toBeInTheDocument();
    });

    it("should fire callback when form is filled out and submitted",async ()=>{
        render(<QuantityForm product={fakeProduct} index={1} updateQuantity={mockUpdateQuantity}/>)

        const quantityDropDown = screen.getByRole('spinbutton');
        const addButton = screen.getByRole('button', {name: /add/i});

        userEvent.click(quantityDropDown);
        userEvent.type(quantityDropDown, '3');
        userEvent.click(addButton);

        expect(await screen.queryByText("3")).not.toBeInTheDocument()

    });
})