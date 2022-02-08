import {Product} from "./product";
import React from "react";
import {Box} from "@mui/material";
import {QuantityForm} from "./QuantityForm";

export interface PartListProps {
    products: Product[],
    updateQuantity:(product:Product)=>void,
    sellQuantity:(product:Product, sellValue:number)=>void,
}

export const PartList: React.FC<PartListProps> = ({products, updateQuantity,sellQuantity}) => {
    return (<>
       <h2>Product</h2>
            {products.map((product, index) => {
            return (
                <Box key={index}>
                    <div>{product.name}</div>
                    <div>Quantity: {product.quantity}</div>
                <QuantityForm product={product} index={index} updateQuantity={updateQuantity} sellQuantity={sellQuantity}/>
                </Box>
            )})}
    </>
    )};