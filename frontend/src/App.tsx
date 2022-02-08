import React, {FormEvent, useEffect, useState} from "react";
import {createProduct, getProducts, updateProductQuantity} from "./productsApiClient";
import {Box, Container} from "@mui/material";
import {Product} from "./product";
import {PartList} from "./PartList";

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>("");

    const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
        setProductName(event.currentTarget.value);
    };

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        createProduct(productName).then(() => {
            getProducts().then(setProducts);
        });
    };
    const updateQuantity=(product:Product)=>{
        updateProductQuantity(product).then(()=>{setProductName(" ")});
    }

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <Container sx={{mx: 1, my: 1}}>
            <h1>Parts Unlimited Inventory</h1>
            <Box display='flex' flexDirection='row'>
                <Box>
                    <form onSubmit={submitForm}>
                        <label>
                            Product to add
                            <input name="product" type="text" onChange={setProductNameFromInput}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <PartList products={products} updateQuantity={updateQuantity}/>
                </Box>
            </Box>
        </Container>
    );
}

export default App;
