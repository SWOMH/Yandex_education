Cypress.Commands.add('dragIngredientToConstructor', (ingredientType) => {
  cy.get(`[data-testid="ingredient-${ingredientType}"]`).first().as('ingredient');
  cy.get('[data-testid="constructor-drop-target"]').as('dropTarget');
  
  cy.get('@ingredient').should('exist');
  cy.get('@dropTarget').should('exist');
  
  cy.wait(300);
  
  cy.get('@ingredient').trigger('dragstart', { force: true });
  
  cy.wait(300);
  
  cy.get('@dropTarget').trigger('dragover', { force: true });
  
  cy.wait(200);
  
  cy.get('@dropTarget').trigger('drop', { force: true });
  
  cy.wait(300);
  
  cy.get('@ingredient').trigger('dragend', { force: true });
  
  cy.wait(500);
}); 