describe('Header links', () => {
  it('Clicking the guide button takes you to the guide page', () => {
    cy.visit('/');
    cy.get('[data-cy="guide"]').click();
    cy.url().should('include', '/guide');
  });
  it('Clicking the favourites button takes you to the guide page', () => {
    cy.visit('/');
    cy.get('[data-cy="favourites"]').click();
    cy.url().should('include', '/favourites');
  });
  it('Clicking the home button takes you to back home', () => {
    cy.visit('/favourites');
    cy.get('[data-cy="home"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Homepage', () => {
  it('Show cards are displayed on the homepage', () => {
    cy.visit('/');
    cy.get('[data-cy="show_card"]').should('exist');
  })
});

describe('Individual show page', () => {
  it("Clicking each show's card takes you to a page displaying its details", () => {
    cy.visit('/');
    cy.get('[data-cy="show_card"]').each((showCard) => {
      showCard.click();
      cy.url().should('not.eq', 'http://localhost:3000/');
      cy.location('pathname').then(path => {
        console.log(path);
        const showId = path.split('/')[2];
        cy.wrap(showId).as('showId');
      });
      cy.get('@showId').then(showId => {
        cy.get(`[data-cy='${showId}']`).should('exist');
      })
    });
  });
});

describe('Guide page', () => {
  it("The guide page initially displays today's date and there is no left arrow", () => {
    cy.visit('/guide');
    const date = new Date().toString().slice(0, 10);
    cy.get('[data-cy="date"]').should('have.text', date);
    cy.get('[data-cy="left_arrow"]').should('not.exist');
  });

  it("Clicking the right arrow displays the date one day after the previously displayed date and the left arrow appears", () => {
    cy.visit('/guide');
    const date = new Date();
    const datePlusOne = new Date(date.setDate(date.getDate() + 1)).toString().slice(0, 10);
    cy.get('[data-cy="right_arrow"]').click();
    cy.get('[data-cy="date"]').should('have.text', datePlusOne);
    cy.get('[data-cy="left_arrow"]').should('exist');
  });
  it("Clicking the left arrow displays the date one day before the previously displayed date", () => {
    cy.visit('/guide');
    const date = new Date();
    const datePlusOne = new Date(date.setDate(date.getDate() + 1));
    const dateMinusOne = new Date(datePlusOne.setDate(datePlusOne.getDate() - 1)).toString().slice(0, 10);
    cy.get('[data-cy="right_arrow"]').click();
    cy.get('[data-cy="left_arrow"]').click();
    cy.get('[data-cy="date"]').should('have.text', dateMinusOne);
  });
});

describe('Favouriting shows', () => {
  it('Clicking the heart changes it from an outline to a filled heart', () => {
    cy.visit('/show/123');
    cy.get('[data-cy="heart"]').click();
    cy.get('[data-cy="heart_filled"]').should('exist');
    cy.get('[data-cy="heart_outline"]').should('not.exist');
  });
  it('Clicking the heart again changes it from a filled heart to an outline again', () => {
    cy.visit('/show/123');
    cy.get('[data-cy="heart"]').click();
    cy.get('[data-cy="heart"]').click();
    cy.get('[data-cy="heart_filled"]').should('not.exist');
    cy.get('[data-cy="heart_outline"]').should('exist');
  });
  it('Clicking the heart saves a show to your favourites', () => {
    cy.visit('/show/123');
    cy.get('[data-cy="heart"]').click();
    cy.visit('/favourites');
    cy.get(`[data-cy='123']`).should('exist');
  });
});

describe('Searching', () => {
  it('Clicking the search icon reveals an input field', () => {
    cy.visit('/');
    cy.get('[data-cy="search_icon"]').click();
    cy.get('[data-cy="search_input"]').should('exist');
  });
  it('Typing a search query and pressing enter takes you to a page of results', () => {
    cy.visit('/');
    cy.get('[data-cy="search_icon"]').click();
    cy.get('[data-cy="search_input"]').type('cat {enter}');
    cy.url().should('include', '/cat');
  });
});

export { }