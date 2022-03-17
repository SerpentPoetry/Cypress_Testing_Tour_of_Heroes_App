///<reference types="Cypress"/>

describe("Testing hero editing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a[href*='board']").as("Dashboard");
    cy.get("a[href*='heroes']").as("Heroes");
  });
  const newHeroName = "Wolverine";

  it("Can edit hero names from Top Heroes, save new names and correctly display them in Top Heroes", () => {
    const topHeroesNames = [];

    cy.get(".heroes-menu > *")
      .each(($el) => {
        topHeroesNames.push($el.text());
      })
      .then(() => {
        topHeroesNames.forEach((hero) => {
          cy.contains(hero).click();
          cy.get("#hero-name").clear().type(newHeroName);
          cy.get("app-hero-detail > :nth-child(1) > h2").should(
            "contain",
            newHeroName.toUpperCase()
          );
          cy.get("button").contains("save").click();
          cy.url().should("contain", "dashboard");
        });
      })
      .then(() => {
        cy.get(".heroes-menu > *").each(($el) => {
          expect($el.text().trim()).is.eq(newHeroName);
        });
      })
      .then(() => {
        topHeroesNames.forEach((hero) => {
          cy.contains(newHeroName).click();
          cy.get("#hero-name").clear().type(hero);
          cy.get("app-hero-detail > :nth-child(1) > h2").should(
            "contain",
            hero.toUpperCase()
          );
          cy.get("button").contains("save").click();
          cy.url().should("contain", "dashboard");
        });
      });
  });

  it("Can edit hero names from Heroes List, save new names and correctly display them in Heros view", () => {
    const listHeroNames = [];
    cy.get("@Heroes").click();
    cy.get(".heroes > li > a")
      .each(($el) => {
        cy.log($el.text());
        listHeroNames.push($el.text().slice(3));
        console.log(listHeroNames);
      })
      .then(() => {
        listHeroNames.forEach((hero) => {
          cy.contains(hero).click();
          cy.get("#hero-name").clear().type(newHeroName);
          cy.get("app-hero-detail > :nth-child(1) > h2").should(
            "contain",
            newHeroName.toUpperCase()
          );
          cy.get("button").contains("save").click();
          cy.url().should("contain", "heroes");
        });
      })
      .then(() => {
        cy.get(".heroes > *").each(($el) => {
          expect($el.text().trim()).to.contain(newHeroName);
        });
      })
      .then(() => {
        listHeroNames.forEach((hero) => {
          cy.contains(newHeroName).click();
          cy.get("#hero-name").clear().type(hero);
          cy.get("app-hero-detail > :nth-child(1) > h2").should(
            "contain",
            hero.toUpperCase()
          );
          cy.get("button").contains("save").click();
          cy.url().should("contain", "heroes");
        });
      });
  });

  it("Can add, display and edit a new hero correctly", () => {
    const editHeroName = "Superman";
    const editHeroID = 21;
    cy.get("@Heroes").click();
    cy.get("#new-hero").type(newHeroName);
    cy.get("button.add-button").click();
    cy.get(".heroes").contains(newHeroName).should("be.visible").click();
    cy.url().should("contain", "detail/" + editHeroID);
    cy.get("#hero-name")
      .should("have.attr", "ng-reflect-model", newHeroName)
      .then(($el) => {
        cy.wrap($el).clear().type(editHeroName);
      });
    cy.get("#hero-name").should("have.attr", "ng-reflect-model", editHeroName);
    cy.get("button").contains("save").click();
    cy.get(":nth-child(11) > a")
      .should("be.visible")
      .and("contain", editHeroName);
    cy.get(":nth-child(11) > .delete").click();
    cy.contains(":nth-child(11) > a", editHeroName).should("not.exist");
  });
});
