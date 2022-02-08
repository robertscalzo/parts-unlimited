import axios from "axios";
import {Product} from "./product";

export async function createProduct(product: string): Promise<Product> {
  return (await axios.post<Product>("/products", product, {headers: {'Content-Type': 'text/plain'}})).data
}

export async function getProducts(): Promise<Product[]> {
  return (await axios.get<Product[]>("/products")).data
}

export async function updateProductQuantity(product:Product):Promise<Product>{
  return (await axios.patch<Product>("/products",product, {headers:{'Content-Type': 'application/json'}})).data;
}
