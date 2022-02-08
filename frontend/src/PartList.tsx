import {Product} from "./product";
import React from "react";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {QuantityForm} from "./QuantityForm";

export interface PartListProps {
    products: Product[],
    updateQuantity: (product: Product) => void,
    sellQuantity: (product: Product, sellValue: number) => void,
}

export const PartList: React.FC<PartListProps> = ({products, updateQuantity, sellQuantity}) => {
    const columns: GridColDef[] = [{field: 'Product', headerName: 'Product', width: 300},
        {field: 'ModelNumber', headerName: 'Model Number', width: 300},
        {field: 'Quantity', headerName: 'Quantity', width: 300},
        {field: 'AddSell ', headerName: 'Add / Sell', width: 900}
    ]
    const rows=products.flatMap((product)=>{return{Product:product.name, Model:product.modelNumber,Quantity:product.quantity,
            AddSell:<QuantityForm product={product} updateQuantity={updateQuantity} sellQuantity={sellQuantity}/>}
    })
    console.log(rows);
    return (
        <>
            <h2>Product</h2>
            {<DataGrid
                rows={rows}
                columns={columns}
            />
            }
        </>
    )
};
                // return (
                //     <DataGrid key={product.id}>
                //         <div>{product.name}</div>
                //         <div>Quantity: {product.quantity}</div>
                //     <QuantityForm product={product} updateQuantity={updateQuantity} sellQuantity={sellQuantity}/>
                //     </DataGrid>
                // )
