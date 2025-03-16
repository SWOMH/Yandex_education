describe('Тесты модального окна с данными ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.wait(1000);
  });

  it('проверка детальных данных булки в модальном окне. Закрытие по кнопки крестика', () => {
    cy.get('[data-testid="ingredient-bun"]').first().click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('exist');
    
    cy.contains('Краторная булка N-200i').should('exist');
    
    cy.get('img[alt="Краторная булка N-200i"]').should('be.visible');
    
    cy.contains('Калории,ккал').should('exist');
    cy.contains('420').should('exist');
    
    cy.contains('Белки, г').should('exist');
    cy.contains('80').should('exist');
    
    cy.contains('Жиры, г').should('exist');
    cy.contains('24').should('exist');
    
    cy.contains('Углеводы, г').should('exist');
    cy.contains('53').should('exist');
    
    cy.get('button').contains('×').click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('not.exist');
  });
  
  it('проверка детальных данных начинки в модальном окне. Закрытие с помощью кнопки escape', () => {
    cy.get('[data-testid="ingredient-main"]').first().click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('exist');
    
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    
    cy.get('img[alt="Биокотлета из марсианской Магнолии"]').should('be.visible');
    
    cy.contains('Калории,ккал').should('exist');
    cy.contains('4242').should('exist');
    
    cy.contains('Белки, г').should('exist');
    cy.contains('420').should('exist');
    
    cy.contains('Жиры, г').should('exist');
    cy.contains('142').should('exist');
    
    cy.contains('Углеводы, г').should('exist');
    cy.contains('242').should('exist');
    
    cy.get('body').type('{esc}', { force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('not.exist');
  });
  
  it('проверка детальных данных соуса в модальном окне', () => {
    cy.get('[data-testid="ingredient-sauce"]').first().click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('exist');
    
    cy.contains('Соус Spicy-X').should('exist');
    
    cy.get('img[alt="Соус Spicy-X"]').should('be.visible');
    
    cy.contains('Калории,ккал').should('exist');
    cy.contains('30').should('exist');
    
    cy.contains('Белки, г').should('exist');
    cy.contains('30').should('exist');
    
    cy.contains('Жиры, г').should('exist');
    cy.contains('20').should('exist');
    
    cy.contains('Углеводы, г').should('exist');
    cy.contains('40').should('exist');
    
    cy.get('button').contains('×').click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('not.exist');
  });
  
  it('закрытие модального окна кликом по оверлею', () => {
    cy.get('[data-testid="ingredient-sauce"]').last().click({ force: true });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('exist');
    
    cy.wait(300);
    
    cy.get('[class*="overlay"]').click({ force: true, position: 'topLeft' });
    
    cy.wait(500);
    
    cy.contains('Детали ингредиента').should('not.exist');
  });
}); 