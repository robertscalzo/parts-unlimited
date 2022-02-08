import React, {FormEvent, useEffect, useState} from "react";
import {createProduct, getProducts, updateProductQuantity} from "./productsApiClient";
import {Box, Container, Snackbar} from "@mui/material";
import {Product} from "./product";
import {PartList} from "./PartList";

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [saleQuantity, setSaleQuantity] = React.useState("");
    const [saleProductName, setSaleProductName] = React.useState("");

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const displayToast = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
        setProductName(event.currentTarget.value);
    };

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        createProduct(productName)
            .then(() => {
                getProducts().then(setProducts);
            });
    };
    const updateQuantity = (product: Product) => {
        updateProductQuantity(product);
        setSaleQuantity(product.quantity.toString());
    }
    const sellQuantity = (product: Product, saleQuantity: number) => {
        if (product.quantity >= saleQuantity) {
            product.quantity = product.quantity - saleQuantity;
            updateQuantity(product);

            setSaleQuantity(saleQuantity.toString());
            setSaleProductName("Sell: " + product.name);
            displayToast();
        } else {
            setSaleQuantity(product.quantity.toString());
            setSaleProductName("Partial Order for: " + product.name);

            updateQuantity(product);
            product.quantity = 0;
            displayToast();
        }
    }


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
                    <PartList products={products} updateQuantity={updateQuantity} sellQuantity={sellQuantity}/>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={saleQuantity ? saleProductName + " X " + saleQuantity : saleProductName}
                />
            </Box>
        </Container>
    );
}

export default App;
