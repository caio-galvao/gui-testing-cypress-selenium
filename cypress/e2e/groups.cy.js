describe('groups', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it('update the name of Wholesale group', () => {
    // Click in groups in side menu
    cy.clickInFirst('a[href="/admin/customer-groups/"]');
    // Type in value input to search for specify group
    cy.get('[id="criteria_search_value"]').type('wholesale');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the last group
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Edit group name
    cy.get('[id="sylius_customer_group_name"]').scrollIntoView().clear().type('Wholesale 100');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that group has been updated
    cy.get('body').should('contain', 'Customer group has been successfully updated.');
  });
  it('filter by "retail"', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .menu > .last').click();
    cy.get('#criteria_search_value').clear('re');
    cy.get('#criteria_search_value').type('retail');
    cy.get('.blue > .icon').click();
    cy.get('tbody > .item > :nth-child(3)').should('have.text', 'Retail');
    /* ==== End Cypress Studio ==== */
  });
  it('filter by "100" after adding another group with "100" in the name', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .menu > .last').click();
    cy.get('.right > .ui').click();
    cy.get('#sylius_customer_group_code').clear('a');
    cy.get('#sylius_customer_group_code').type('aux');
    cy.get('#sylius_customer_group_name').clear('n');
    cy.get('#sylius_customer_group_name').type('vinyl sale 100');
    cy.get('.labeled > .plus').click();
    cy.get('.breadcrumb > [href="/admin/customer-groups/"]').click();
    cy.get('#criteria_search_value').clear('1');
    cy.get('#criteria_search_value').type('100');
    cy.get('.blue > .icon').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'Wholesale 100');
    /* ==== End Cypress Studio ==== */
  });

  // Implement the remaining test cases in a similar manner

  /* ==== Test Created with Cypress Studio ==== */
  it('sort reverse alphabetically by "name"', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .menu > .last').click();
    cy.get('.sorted').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'Wholesale 100');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('tbody > :nth-child(3) > :nth-child(3)').should('have.text', 'Retail');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('sort alphabetically by "code"', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .menu > .last').click();
    cy.get('.sort').click();
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.text', 'aux');
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'retail');
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'wholesale');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('filter by starting with "v" then clear the filter', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(3) > .menu > .last').click();
    cy.get('#criteria_search_type').select('starts_with');
    cy.get('#criteria_search_value').clear('v');
    cy.get('#criteria_search_value').type('v');
    cy.get('.blue').click();
    cy.get('tbody > .item > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('.loadable > a.ui').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('be.visible');
    cy.get('tbody > :nth-child(3) > :nth-child(3)').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
  it('create a new group called test', () => {
    // Click in groups in side menu
    cy.contains('Groups').click();

    // Click on Create button
    cy.contains('Create').click();

    // Insert the code for the new group
    cy.get('#sylius_customer_group_code').type('test');

    // Insert the name for the new group
    cy.get('#sylius_customer_group_name').type('Test');

    // Click on Create button
    cy.get('.ui.labeled.icon.primary.button').click();

    // Assert that group has been created
    cy.contains('Customer group has been successfully created.').should('be.visible');
});

it('try to create a new group with existing code', () => {
    // Click in groups in side menu
    cy.contains('Groups').click();

    // Click on Create button
    cy.contains('Create').click();

    // Insert the code for the new group
    cy.get('#sylius_customer_group_code').type('retail');

    // Insert the name for the new group
    cy.get('#sylius_customer_group_name').type('Retail');

    // Click on Create button
    cy.get('.ui.labeled.icon.primary.button').click();

    // Assert the error messages
    cy.get('.ui.red.pointing.label.sylius-validation-error').should('contain', 'Customer group code has to be unique.');
    cy.contains('This form contains errors.').should('be.visible');
});

it('create a new group different code but existing name', () => {
    // Click in groups in side menu
    cy.contains('Groups').click();

    // Click on Create button
    cy.contains('Create').click();

    // Insert the code for the new group
    cy.get('#sylius_customer_group_code').type('new_retail');

    // Insert the name for the new group
    cy.get('#sylius_customer_group_name').type('Retail');

    // Click on Create button
    cy.get('.ui.labeled.icon.primary.button').click();

    // Assert that group has been created
    cy.contains('Customer group has been successfully created.').should('be.visible');
});

it('remove the group test', () => {
    // Click in groups in side menu
    cy.contains('Groups').click();

    // Type in value input to search for specify group
    cy.get('#criteria_search_value').type('test');

    // Click in filter blue button
    cy.get('.ui.blue.labeled.icon.button').click();

    // Click in delete of the last group
    cy.get('.ui.red.labeled.icon.button').last().click();

    // Click on yes to confirm
    cy.get('#confirmation-button').click();

    // Assert that group has been deleted
    cy.contains('Customer group has been successfully deleted.').should('be.visible');
});

it('remove the group new_retail by checkbox', () => {
    // Click in groups in side menu
    cy.contains('Groups').click();

    // Type in value input to search for specify group
    cy.get('#criteria_search_value').type('new_retail');

    // Click in filter blue button
    cy.get('.ui.blue.labeled.icon.button').click();

    // Click in the checkbox of the last group
    cy.get('.bulk-select-checkbox').last().click();

    // Click on the first delete button
    cy.get('.ui.red.labeled.icon.button').first().click();

    // Click on yes to confirm
    cy.get('#confirmation-button').click();

    // Assert that group has been deleted
    cy.contains('Customer_groups have been successfully deleted.').should('be.visible');
});

});
