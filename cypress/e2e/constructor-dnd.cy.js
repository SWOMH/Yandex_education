
const SELECTORS = {
  INGREDIENT_BUN: '[data-testid="ingredient-bun"]',
  CONSTRUCTOR_DROP_TARGET: '[data-testid="constructor-drop-target"]',
  CONSTRUCTOR_BUN_TOP: '[data-testid="constructor-bun-top"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-testid="constructor-bun-bottom"]',
  INGREDIENT_MAIN: '[data-testid="ingredient-main"]',
  CONSTRUCTOR_ITEMS: '[data-testid="constructor-items"]',
  ORDER_BUTTON: '[data-testid="order-button"]'
};


Cypress.Commands.add('dragAndDrop', (sourceSelector, destinationSelector) => {
  cy.get(sourceSelector).first().trigger('dragstart', { force: true });
  cy.wait(300);
  cy.get(destinationSelector).trigger('drop', { force: true });
  cy.wait(300);
  cy.get(sourceSelector).first().trigger('dragend', { force: true });
  cy.wait(500);
});

describe('Конструктор бургеров - перетаскивание ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.wait(1000);
  });

  it('перетаскивание булки в конструктор', () => {
    cy.dragAndDrop(SELECTORS.INGREDIENT_BUN, SELECTORS.CONSTRUCTOR_DROP_TARGET);
    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('exist').and('be.visible');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('exist').and('be.visible');
  });

  it('перетаскивание начинки в конструктор', () => {
    cy.dragAndDrop(SELECTORS.INGREDIENT_BUN, SELECTORS.CONSTRUCTOR_DROP_TARGET);
    cy.dragAndDrop(SELECTORS.INGREDIENT_MAIN, SELECTORS.CONSTRUCTOR_DROP_TARGET);
    cy.get(SELECTORS.CONSTRUCTOR_ITEMS).find('[data-testid^="constructor-ingredient-"]').should('exist');
  });

  it('проверка активации кнопки заказа после добавления ингредиентов', () => {
    cy.get(SELECTORS.ORDER_BUTTON).should('be.disabled');
    cy.dragAndDrop(SELECTORS.INGREDIENT_BUN, SELECTORS.CONSTRUCTOR_DROP_TARGET);
    cy.dragAndDrop(SELECTORS.INGREDIENT_MAIN, SELECTORS.CONSTRUCTOR_DROP_TARGET);
    cy.get(SELECTORS.ORDER_BUTTON).should('not.be.disabled');
  });
});