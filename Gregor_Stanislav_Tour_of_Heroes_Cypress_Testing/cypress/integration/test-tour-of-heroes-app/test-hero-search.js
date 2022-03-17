///<reference types="Cypress"/>

describe("Testing Hero Search autosuggestive dropdown", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#search-box").as("Search");
  });

  it("Should show all hero names containing substring", () => {
    const searchThis = ["ma", "MA", "Ma"];
    searchThis.forEach((substr) => {
      cy.get("@Search").type(substr);
      cy.get("ul.search-result > li").each(($el) => {
        cy.wrap($el).contains(substr, { matchCase: false });
        cy.log($el.text());
      });
      cy.get("@Search").clear();
    });
  });

  it("Should show specific hero and navigate to the hero's details", () => {
    const heroToSelect = "Magneta";
    const heroID = 15;
    cy.get("@Search").type("ma");
    cy.get("ul.search-result > li").each(($el) => {
      if ($el.text().trim() === heroToSelect) {
        cy.wrap($el).click();
        cy.url().should("contain", "detail/" + heroID);
        cy.get("app-hero-detail > :nth-child(1) > h2").should(
          "contain",
          heroToSelect.toUpperCase()
        );
        cy.get("button").contains("go back").click();
        cy.get("#search-component > label").should("have.text", "Hero Search");
      }
    });
  });
  it("Shouldn't show autosuggestive dropdown menu", () => {
    const searchThis = [" ma", "$ma", "15ma"];
    searchThis.forEach((substr) => {
      cy.get("@Search").type(substr);
      cy.get("ul.search-result > *").should("not.exist");
      cy.get("@Search").clear();
    });
  });
});
