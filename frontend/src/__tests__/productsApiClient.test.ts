import nock from 'nock';
import {createProduct, getProducts, updateProductQuantity} from "../productsApiClient";
import {body} from "msw/lib/types/context";

describe('productsApiClient', () => {
    describe('getProducts', () => {
        it('should make a GET request to retrieve all products', async () => {
            const expectedProducts = [{name: 'first-product', quantity: 0}, {name: 'second-product', quantity: 2}];
            nock('http://localhost').get('/products').reply(200, expectedProducts);

            const actualProducts = await getProducts();

            expect(actualProducts).toEqual(expectedProducts);
        });
    });

    describe('createProduct', () => {
        it('should make a POST request to create a product', async () => {
            const scope = nock('http://localhost', {
                reqheaders: {
                    'Content-Type': 'text/plain'
                }
            }).post('/products', 'my-new-product')
                .reply(200, {name: "my-new-product", quantity: 0});

            const response = await createProduct("my-new-product");

            expect(scope.isDone()).toEqual(true);
            expect(response.name).toEqual("my-new-product");
            expect(response.quantity).toEqual(0);
        });

        it('should make a PATCH request to update quantity', async()=>{
            const scope = nock('http://localhost', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            }).patch('/products', {id:0, name: "my-new-product", quantity: 3})
                .reply(200, {id:0, name: "my-new-product", quantity: 3});

            const response = await updateProductQuantity({id:0, name: "my-new-product", quantity: 3});

            expect(scope.isDone()).toEqual(true);
            expect(response.name).toEqual("my-new-product");
            expect(response.quantity).toEqual(3);
        })
    });
});