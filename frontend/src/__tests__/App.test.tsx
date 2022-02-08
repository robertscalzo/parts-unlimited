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
        mockCreateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", modelNumber:7, quantity: 0});
        mockGetProducts.mockResolvedValueOnce([]);
        mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", modelNumber:7, quantity: 0}]);

        render(<App/>);

        expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
    });

    describe("Product Form Tests", () => {
        it("should display the new product", async () => {
            mockCreateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", modelNumber:7,quantity: 0});
            mockGetProducts.mockResolvedValueOnce([]);
            mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", modelNumber:7,quantity: 0}]);

            render(<App/>);
            addProduct("shiny new product");

            expect(mockCreateProduct).toHaveBeenCalledWith("shiny new product");
            expect(await screen.findByText("shiny new product")).toBeInTheDocument();
        });
    });

    describe("when I add or sell inventory of a product", () => {
        beforeEach(async ()=>{
            mockCreateProduct.mockResolvedValue({id:1,name: "shiny new product",modelNumber:7, quantity: 0});
            mockGetProducts.mockResolvedValue([{id:1,name: "shiny new product", modelNumber:7,quantity: 0}]);

            render(<App/>)
        });

        it("should display the product with updated inventory", async () => {


            const addButton = await screen.findByRole('button', {name: /add/i});
            const quantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Add"});

            userEvent.click(addButton);
            userEvent.type(quantityDropDown, '3');
            userEvent.click(addButton);
            expect(await screen.findByText('Quantity: 3')).toBeInTheDocument();
        })
        it("should present sale notification toast when a sale is completed",async ()=>{
            const addButton = await screen.findByRole('button', {name: /add/i});
            const sellButton = await screen.findByRole('button', {name: /sell/i});
            const addQuantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Add"});
            const sellQuantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Sell"});

            userEvent.click(addButton);
            userEvent.type(addQuantityDropDown, '3');
            userEvent.click(addButton);

            await screen.findByText('Quantity: 3');

            userEvent.click(sellQuantityDropDown);
            userEvent.type(sellQuantityDropDown, '2');
            userEvent.click(sellButton);

            expect(await screen.findByText("Sell: shiny new product X 2")).toBeInTheDocument();

        })
        it("should present partial sales toast when a sale is too large",async ()=>{
            const addButton = await screen.findByRole('button', {name: /add/i});
            const sellButton = await screen.findByRole('button', {name: /sell/i});
            const addQuantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Add"});
            const sellQuantityDropDown = screen.getByRole('spinbutton', {name: "Quantity to Sell"});

            userEvent.click(addQuantityDropDown);
            userEvent.type(addQuantityDropDown, '3');
            userEvent.click(addButton);

            await screen.findByText('Quantity: 3');

            userEvent.click(sellQuantityDropDown);
            userEvent.type(sellQuantityDropDown, '4');
            userEvent.click(sellButton);

            expect(await screen.findByText("Partial Order for: shiny new product X 3")).toBeInTheDocument();
        })
    })
});
