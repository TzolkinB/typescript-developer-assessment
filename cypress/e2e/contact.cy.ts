describe("Contact Page", () => {
  it("should not submit form without checking and submitting CAPTCHA", () => {
    cy.visit("/");
    cy.url().should("include", "contact");

    cy.findByRole("heading", { name: "Get in touch!", level: 1 });

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

      // cy.get('.captcha__element').find('iframe').should('be.visible').as('iFrame')
      // cy.get('@iFrame')
      // .then($iframe => {
      //   const iframeBody = $iframe.contents().find('body')
      //   cy.wrap(iframeBody).first().within(() => {
      //     // cy.findByLabelText("")
      //     // cy.findByRole('checkbox')
      //     cy.get('checkbox', { timeout: 6000})
      //   })
      // })

      cy.findByRole("button", { name: "Send" }).click();
    });
    cy.get(".alert-box").within(() => {
      cy.findByText("The answer you entered for the CAPTCHA was not correct.");
      cy.findByRole("button", { name: "Dismiss alert" }).click();
    });
  });
});

// The form on https://lastcallmedia.com/contact sometimes allows users to submit without filling out the CAPTCHA. We would like to verify that the form cannot be submitted without solving the CAPTCHA (note: no need to actually perform a successful submission here).
