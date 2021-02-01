const originalMessage = "👋 Hey, how's life?";
const respondMessage = "You hear me?";

describe("Chat", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads and all sections are available", () => {
    cy.get("[data-cy=app]").should("exist");
    cy.get("[data-cy=header]").should("exist");
    cy.get("[data-cy=messageList]").should("exist");
    cy.get("[data-cy=messageInput]").should("exist");
  });

  it("can send message", () => {
    cy.get("[data-cy=messageText]").should("not.exist");
    cy.get("[data-cy=textarea]").type(originalMessage);
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=messageText]").its("length").should("equal", 1);
    cy.get("[data-cy=messageText]").eq(0).should("contain", originalMessage);
  });

  it("resets form on message send", () => {
    cy.get("[data-cy=submit]").should("be.disabled");
    cy.get("[data-cy=textarea]").type(originalMessage);
    cy.get("[data-cy=submit]").should("be.enabled");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=submit]").should("be.disabled");
  });

  it("can respond to a message", () => {
    cy.get("[data-cy=textarea]").type(originalMessage);
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=messageText]").contains(originalMessage).click();
    cy.wait(3000);
    cy.get("[data-cy=textarea]").type(respondMessage);
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=messageText]")
      .contains(respondMessage)
      .parent()
      .should("contain", originalMessage);
  });
});
