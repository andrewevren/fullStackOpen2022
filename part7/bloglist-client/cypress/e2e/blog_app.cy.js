describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Andy",
      username: "andyevery",
      password: "open",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("andyevery");
      cy.get("#password").type("open");
      cy.get("#login-button").click();

      cy.contains("Andy logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("neverandy");
      cy.get("#password").type("close");
      cy.get("#login-button").click();

      cy.contains("Invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "andyevery",
        password: "open",
      }).then((response) => {
        localStorage.setItem(
          "loggedBloglistUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test blog");
      cy.get("#author").type("Test Testerson");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();

      cy.contains("Test blog");
    });

    it.only("a blog can be deleted by its creator", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test blog");
      cy.get("#author").type("Test Testerson");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.contains("Test blog").parent().contains("view").click();
      cy.contains("Test blog").parent().contains("remove").click();
      cy.get("html").should("not.contain", "Test blog");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.contains("new blog").click();
        cy.get("#title").type("Likeable blog");
        cy.get("#author").type("Like Testerson");
        cy.get("#url").type("google.com");
        cy.get("#create-button").click();
      });

      it("a blog can be liked", function () {
        cy.contains("Likeable blog").parent().as("theBlog");
        cy.get("@theBlog").contains("view").click();
        cy.get("@theBlog").contains("like").click();
        cy.get("@theBlog").contains("1");
      });
    });
  });
});
