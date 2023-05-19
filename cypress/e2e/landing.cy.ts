describe("authentication", () => {
  it("render a heading", () => {
    cy.visit("/");

    cy.findByRole("heading", { name: "Remix Template" });
  });
});
