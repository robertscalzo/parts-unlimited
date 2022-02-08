const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByRole("button").click();
}
describe("inventory", () => {
  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:8080");
      addProduct("shiny-new-product");
      cy.findByText("shiny-new-product").should("exist");
      cy.findByText("Quantity: 0").should("exist");
    });
  });
  describe("when changing a quantity on an existing product",()=>{
    it("should display the new product quantity with the updated value",()=>{
      cy.findByRole("spinbutton",{name:"Quantity to Add"}).click().type("3");
      cy.findByRole('button',{name:"Add"}).click()
      cy.findByText("Quantity: 3").should("exist");
    })
  })
});
