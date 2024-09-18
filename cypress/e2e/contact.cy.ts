describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("include", "contact");

    cy.findByRole("heading", { name: "Get in touch!", level: 1 });
  });

  it("should not submit form without checking and submitting CAPTCHA", () => {
    cy.get(".lcm-contact-form").within(() => {
      cy.findByLabelText("Name")
        .should("be.empty")
        .type("Tom")
        .should("have.value", "Tom");
      cy.findByLabelText("Email")
        .should("be.empty")
        .type("tom@abc.com")
        .should("have.value", "tom@abc.com");
      cy.findByLabelText("Message")
        .should("be.empty")
        .type("test assessment")
        .should("have.value", "test assessment");

      cy.get(".captcha__element")
        .find("iframe")
        .first()
        .then(($iframe) => {
          const iframeBody = $iframe.contents().find("body");
          cy.wrap(iframeBody)
            .first()
            .within(() => {
              cy.findByText("I'm not a robot");
              cy.findByRole("checkbox").click();
            });
        });

      cy.findByRole("button", { name: "Send" }).click();
    });
    cy.get(".alert-box").within(() => {
      cy.findByText("The answer you entered for the CAPTCHA was not correct.");
      cy.findByRole("button", { name: "Dismiss alert" }).click();
    });
  });
});
