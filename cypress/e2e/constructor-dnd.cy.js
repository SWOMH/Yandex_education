describe('Конструктор бургеров - перетаскивание ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.wait(1000);
  });

  it('перетаскивание булки в конструктор', () => {
    cy.get('[data-testid="ingredient-bun"]').first().as('bun');

    cy.get('[data-testid="constructor-drop-target"]').as('dropTarget');

    cy.get('@bun').should('exist');
    cy.get('@dropTarget').should('exist');

    cy.get('@bun')
      .trigger('dragstart', { force: true });
    
    cy.wait(300);
    
    cy.get('@dropTarget')
      .trigger('drop', { force: true });
    
    cy.wait(300);
    
    cy.get('@bun')
      .trigger('dragend', { force: true });

    cy.wait(500);

    cy.get('[data-testid="constructor-bun-top"]').should('exist');
    cy.get('[data-testid="constructor-bun-top"]').should('be.visible');
    cy.get('[data-testid="constructor-bun-bottom"]').should('exist');
    cy.get('[data-testid="constructor-bun-bottom"]').should('be.visible');
  });

  it('перетаскивание начинки в конструктор', () => {
    cy.get('[data-testid="ingredient-bun"]').first()
      .trigger('dragstart', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="constructor-drop-target"]')
      .trigger('drop', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="ingredient-bun"]').first()
      .trigger('dragend', { force: true });
    
    cy.wait(500);

    cy.get('[data-testid="ingredient-main"]').first().as('filling');

    cy.get('@filling')
      .trigger('dragstart', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="constructor-drop-target"]')
      .trigger('drop', { force: true });
    
    cy.wait(300);
    
    cy.get('@filling')
      .trigger('dragend', { force: true });

    cy.wait(500);

    cy.get('[data-testid="constructor-items"]').find('[data-testid^="constructor-ingredient-"]').should('exist');
  });

  it('проверка активации кнопки заказа после добавления ингредиентов', () => {
    cy.get('[data-testid="order-button"]').should('be.disabled');

    cy.get('[data-testid="ingredient-bun"]').first()
      .trigger('dragstart', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="constructor-drop-target"]')
      .trigger('drop', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="ingredient-bun"]').first()
      .trigger('dragend', { force: true });
    
    cy.wait(500);

    cy.get('[data-testid="ingredient-main"]').first()
      .trigger('dragstart', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="constructor-drop-target"]')
      .trigger('drop', { force: true });
    
    cy.wait(300);
    
    cy.get('[data-testid="ingredient-main"]').first()
      .trigger('dragend', { force: true });
    
    cy.wait(500);

    cy.get('[data-testid="order-button"]').should('not.be.disabled');
  });

}); 