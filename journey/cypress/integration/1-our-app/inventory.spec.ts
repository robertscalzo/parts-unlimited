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
  describe("when trying to sell product",()=>{
    it("should display DECLINATION message if you sell too much",()=>{
      cy.findByRole("spinbutton",{name:"Quantity to Sell"}).click().type("4");
      cy.findByRole('button',{name:"Sell"}).click()
      cy.findByText("Cannot Sell - inventory too low!").should("exist");
    })
    it("should display correct quantity in  message if sale is valid",()=>{
      cy.findByRole("spinbutton",{name:"Quantity to Sell"}).click().clear().type("2");
      cy.findByRole('button',{name:"Sell"}).click()
      cy.findByText("Sell: shiny-new-product X 2").should("exist");
    })
  })
});
