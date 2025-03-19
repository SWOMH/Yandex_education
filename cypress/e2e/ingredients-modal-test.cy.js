

const SELECTORS = {
  INGREDIENT_BUN: '[data-testid="ingredient-bun"]',
  INGREDIENT_MAIN: '[data-testid="ingredient-main"]',
  INGREDIENT_SAUCE: '[data-testid="ingredient-sauce"]',
  MODAL_OVERLAY: '[class*="overlay"]',
  MODAL_TITLE: 'Детали ингредиента',
  MODAL_CLOSE_BUTTON: 'button:contains("×")',
  MODAL_IMAGE: 'img[alt]',
  MODAL_CALORIES: 'Калории,ккал',
  MODAL_PROTEINS: 'Белки, г',
  MODAL_FATS: 'Жиры, г',
  MODAL_CARBS: 'Углеводы, г'
};

Cypress.Commands.add('openIngredientModal', (selector) => {
  cy.get(selector).first().click({ force: true });
  cy.wait(500);
  cy.contains(SELECTORS.MODAL_TITLE).should('exist');
});


Cypress.Commands.add('closeModal', (method = 'button') => {
  if (method === 'button') {
    cy.get(SELECTORS.MODAL_CLOSE_BUTTON).click({ force: true });
  } else if (method === 'escape') {
    cy.get('body').type('{esc}', { force: true });
  } else if (method === 'overlay') {
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true, position: 'topLeft' });
  }
  cy.wait(500);
  cy.contains(SELECTORS.MODAL_TITLE).should('not.exist');
});


Cypress.Commands.add('checkIngredientDetails', (name, calories, proteins, fats, carbs) => {
  cy.contains(name).should('exist');
  cy.get(SELECTORS.MODAL_IMAGE).should('be.visible');
  cy.contains(SELECTORS.MODAL_CALORIES).should('exist');
  cy.contains(calories).should('exist');
  cy.contains(SELECTORS.MODAL_PROTEINS).should('exist');
  cy.contains(proteins).should('exist');
  cy.contains(SELECTORS.MODAL_FATS).should('exist');
  cy.contains(fats).should('exist');
  cy.contains(SELECTORS.MODAL_CARBS).should('exist');
  cy.contains(carbs).should('exist');
});

describe('Тесты модального окна с данными ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.wait(1000);
  });

  it('проверка детальных данных булки в модальном окне. Закрытие по кнопке крестика', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_BUN);
    cy.checkIngredientDetails('Краторная булка N-200i', '420', '80', '24', '53');
    cy.closeModal('button');
  });

  it('проверка детальных данных начинки в модальном окне. Закрытие с помощью кнопки escape', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_MAIN);
    cy.checkIngredientDetails('Биокотлета из марсианской Магнолии', '4242', '420', '142', '242');
    cy.closeModal('escape');
  });

  it('проверка детальных данных соуса в модальном окне', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_SAUCE);
    cy.checkIngredientDetails('Соус Spicy-X', '30', '30', '20', '40');
    cy.closeModal('button');
  });

  it('закрытие модального окна кликом по оверлею', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_SAUCE);
    cy.closeModal('overlay');
  });
});