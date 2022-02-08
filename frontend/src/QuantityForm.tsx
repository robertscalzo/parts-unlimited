import {Product} from "./product";
import React, {FormEvent} from "react";

interface QuantityFormProps {
    product: Product,
    index: number,
    updateQuantity:(product:Product)=>void,
}


export const QuantityForm: React.FC<QuantityFormProps> = ({product, index, updateQuantity}) => {
    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        updateQuantity(product)
    };
    return (
        <form key={index} onSubmit={submitForm}>
            <label>
                Quantity to Add
                <input name="product" type="number" onChange={(event)=>product.quantity=Number(event.target.value)}/>
            </label>
            <button type="submit">Add</button>
        </form>);
}