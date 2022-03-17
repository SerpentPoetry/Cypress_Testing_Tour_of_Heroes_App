///<reference types="Cypress"/>

describe("Testing navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a[href*='board']").as("Dashboard");
    cy.get("a[href*='heroes']").as("Heroes");
  });

  it("Should start the app in the dashboard view", () => {
    cy.title().should("eq", "Tour of Heroes");
    cy.url().should("include", "dashboard");
  });

  it("Should navigate between the Dashboard view and Heroes view", () => {
    cy.get("@Heroes").should("have.text", "Heroes").click();
    cy.url().should("include", "heroes");
    cy.get("@Dashboard").should("have.text", "Dashboard").click();
    cy.url().should("include", "dashboard");
  });

  it("Should navigate from Top Heroes to heroes details and back to the Dashboard view via go back button", () => {
    //"Narco", "Bombasto", "Celeritas", "Magneta"
    const topHeroes = [];
    cy.get(".heroes-menu")
      .find("a")
      .each(($el) => {
        topHeroes.push($el.text());
      })
      .then(() => {
        topHeroes.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.contains("button", "go back").click();
          cy.url().should("include", "dashboard");
        });
      });
    /*  topHeroes.forEach((hero) => {
      cy.contains(hero).click();
      cy.url().should("include", "detail");
      cy.contains("button", "go back").click();
      cy.url().should("include", "dashboard");
    }); */
  });

  it("Should navigate from Top Heroes to heroes details and back to the Dashboard view via Dashboard button", () => {
    const topHeroes = [];
    cy.get(".heroes-menu")
      .find("a")
      .each(($el) => {
        topHeroes.push($el.text());
      })
      .then(() => {
        topHeroes.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.get("@Dashboard").click();
          cy.url().should("include", "dashboard");
        });
      });
  });

  it("Should navigate from Top Heroes to heroes details and back to the Heroes view via Heroes button", () => {
    const topHeroes = [];
    cy.get(".heroes-menu")
      .find("a")
      .each(($el) => {
        topHeroes.push($el.text());
      })
      .then(() => {
        topHeroes.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.get("@Heroes").click();
          cy.url().should("include", "heroes");
        });
      });
  });

  it("Should navigate to Heroes view and through hero list to hero details and back to Heroes view via go back button", () => {
    cy.get("@Heroes").click();
    cy.url().should("include", "heroes");
    const heroesList = [];
    cy.get(".heroes > *")
      .each(($el) => {
        heroesList.push($el.text());
      })
      .then(() => {
        heroesList.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.contains("button", "go back").click();
          cy.url().should("include", "heroes");
        });
      });
  });

  it("Should navigate to Heroes view and through hero list to hero details and back to Heroes view via Heroes button", () => {
    cy.get("@Heroes").click();
    cy.url().should("include", "heroes");
    const heroesList = [];
    cy.get(".heroes > *")
      .each(($el) => {
        heroesList.push($el.text());
      })
      .then(() => {
        heroesList.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.get("@Heroes").click();
          cy.url().should("include", "heroes");
        });
      });
  });

  it("Should navigate to Heroes view and through hero list to hero details and back to Dashboard view via Dashboard button", () => {
    cy.get("@Heroes").click();
    cy.url().should("include", "heroes");
    const heroesList = [];
    cy.get(".heroes > *")
      .each(($el) => {
        heroesList.push($el.text());
      })
      .then(() => {
        heroesList.forEach((hero) => {
          cy.contains(hero).click();
          cy.url().should("include", "detail");
          cy.get("@Dashboard").click();
          cy.url().should("include", "dashboard");
          cy.get("@Heroes").click();
        });
      });
  });
});
