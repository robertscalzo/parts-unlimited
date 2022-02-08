import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {createProduct, getProducts} from "../productsApiClient";

jest.mock("../productsApiClient");

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;
const mockCreateProduct = createProduct as jest.MockedFunction<typeof createProduct>;

const addProduct = (product: string) => {
    userEvent.type(screen.getByLabelText("Product to add"), product);
    userEvent.click(screen.getByRole("button", {name: /submit/i}));
}

describe("inventory", () => {
    it('should display App Headers',   async()=>{
        mockCreateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", quantity: 0});
        mockGetProducts.mockResolvedValueOnce([]);
        mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", quantity: 0}]);

        render(<App/>);

        expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
    });

    describe("Product Form Tests", () => {
        it("should display the new product", async () => {
            mockCreateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", quantity: 0});
            mockGetProducts.mockResolvedValueOnce([]);
            mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", quantity: 0}]);

            render(<App/>);
            addProduct("shiny new product");

            expect(mockCreateProduct).toHaveBeenCalledWith("shiny new product");
            expect(await screen.findByText("shiny new product")).toBeInTheDocument();
        });
    });

    describe("when I add or sell inventory of a product", () => {
        it("should display the product with updated inventory", async () => {
            mockCreateProduct.mockResolvedValue({id:1,name: "shiny new product", quantity: 0});
            mockGetProducts.mockResolvedValue([{id:1,name: "shiny new product", quantity: 0}]);

            render(<App/>)

            const addButton = await screen.findByRole('button', {name: /add/i});
            const quantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Add"});

            userEvent.click(quantityDropDown);
            userEvent.type(quantityDropDown, '3');
            userEvent.click(addButton);
            expect(await screen.findByText('Quantity: 3')).toBeInTheDocument();
        })
        it("should present sale notification toast when a sale is completed",async ()=>{
            mockCreateProduct.mockResolvedValue({id:1,name: "shiny new product", quantity: 0});
            mockGetProducts.mockResolvedValue([{id:1,name: "shiny new product", quantity: 0}]);

            render(<App/>)

            const sellButton = await screen.findByRole('button', {name: /sell/i});
            const quantitySellDropDown = screen.getByRole('spinbutton', {name: "Quantity to Sell"});

            const addButton = await screen.findByRole('button', {name: /add/i});
            const quantityAddDropDown = screen.getByRole('spinbutton', {name: "Quantity to Add"});

            userEvent.click(quantityAddDropDown);
            userEvent.type(quantityAddDropDown, '3');
            userEvent.click(addButton);
            await screen.findByText('Quantity: 3');

            userEvent.click(quantitySellDropDown);
            userEvent.type(quantitySellDropDown, '2');
            userEvent.click(sellButton);

            expect(await screen.findByText("Sell: shiny new product X 2")).toBeInTheDocument();

        })
        it("should present sale DECLINATION toast when a sale is invalid",async ()=>{
            mockCreateProduct.mockResolvedValue({id:1,name: "shiny new product", quantity: 0});
            mockGetProducts.mockResolvedValue([{id:1,name: "shiny new product", quantity: 0}]);

            render(<App/>)

            const sellButton = await screen.findByRole('button', {name: /sell/i});
            const quantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Sell"});

            userEvent.click(quantityDropDown);
            userEvent.type(quantityDropDown, '3');
            userEvent.click(sellButton);
            expect(await screen.findByText("Cannot Sell - inventory too low!")).toBeInTheDocument();

        })
    })
});
