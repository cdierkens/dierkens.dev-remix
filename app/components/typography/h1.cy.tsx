import { H1 } from "./h1.component";

describe("<H1 />", () => {
  it("renders it's children", () => {
    cy.mount(<H1>Hello World</H1>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
