import {Product} from "./product";
import React, {FormEvent} from "react";
import {Box} from "@mui/material";

interface QuantityFormProps {
    product: Product,
    updateQuantity:(product:Product)=>void,
    sellQuantity:(product:Product, saleQuantity:number)=>void,
}


export const QuantityForm: React.FC<QuantityFormProps> = ({product, updateQuantity, sellQuantity}) => {
    let formSaleValue=0;
    const submitAddForm = (event: FormEvent) => {
        event.preventDefault();
        updateQuantity(product)
    };
    const submitSellForm = (event: FormEvent) => {
        event.preventDefault();
        sellQuantity(product,formSaleValue)
    };
    return (
        <Box>
        <form onSubmit={submitAddForm}>
            <label>
                Quantity to Add
                <input name="product" type="number" onChange={(event)=>product.quantity=Number(event.target.value)}/>
            </label>
            <button type="submit">Add</button>
        </form>
        <form onSubmit={submitSellForm}>
            <label>
                Quantity to Sell
                <input name="product" type="number" onChange={(event)=>formSaleValue=Number(event.target.value)}/>
            </label>
            <button type="submit">Sell</button>
        </form>
        </Box>
    );
}
