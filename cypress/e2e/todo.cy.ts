describe('Todo List Page', () => {
  beforeEach(() => {
    cy.visit('http://host.docker.internal:5173/todo');
  });

  it('should add a task', () => {
    cy.get('input').type('My New Task');
    cy.contains('Add').click();
    cy.get('[name=task-field]').type('Another Task{enter}');
    cy.get('.task-list tr').should('have.length', 2);
  });
});

