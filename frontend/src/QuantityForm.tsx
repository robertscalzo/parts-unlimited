import {Product} from "./product";
import React, {FormEvent} from "react";
import {Box} from "@mui/material";

interface QuantityFormProps {
    product: Product,
    index: number,
    updateQuantity:(product:Product)=>void,
    sellQuantity:(product:Product, sellValue:number)=>void,
}


export const QuantityForm: React.FC<QuantityFormProps> = ({product, index, updateQuantity, sellQuantity}) => {
    let sellValue=0;
    const submitAddForm = (event: FormEvent) => {
        event.preventDefault();
        updateQuantity(product)
    };
    const submitSellForm = (event: FormEvent) => {
        event.preventDefault();
        sellQuantity(product,sellValue)
    };
    return (
        <Box>
        <form key={product.id} onSubmit={submitAddForm}>
            <label>
                Quantity to Add
                <input name="product" type="number" onChange={(event)=>product.quantity=Number(event.target.value)}/>
            </label>
            <button type="submit">Add</button>
        </form>
        <form key={product.id} onSubmit={submitSellForm}>
            <label>
                Quantity to Sell
                <input name="product" type="number" onChange={(event)=>sellValue=Number(event.target.value)}/>
            </label>
            <button type="submit">Sell</button>
        </form>
        </Box>
    );
}
