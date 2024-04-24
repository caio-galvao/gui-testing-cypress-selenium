const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('groups', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it('update the name of Wholesale group', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Type in value input to search for specify group
    await driver.findElement(By.id('criteria_search_value')).sendKeys('wholesale');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last group
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Edit group name
    const inputName = await driver.findElement(By.id('sylius_customer_group_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Wholesale 100');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that group has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Customer group has been successfully updated.'));
  });

/*   it('filter by "retail"', async () => {
    await driver.findElement(By.linkText('Groups')).click();
    
    //cy.get('#criteria_search_value').clear('re');

    await driver.findElement(By.id('criteria_search_value')).sendKeys('retail');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    const item = await driver.findElement(By.css('.item td:nth-child(3)'));
    assert(item.includes('Retail'));
  }); */

/*   it('filter by "100" after adding another group with "100" in the name', async () => {
    await driver.findElement(By.linkText('Groups')).click();

    //cy.get('.right > .ui').click();
    await driver.findElement(By.linkText('Create')).click();

    //cy.get('#sylius_customer_group_code').clear('a');
    //cy.get('#sylius_customer_group_code').type('aux');
    const inputCode = await driver.findElement(By.id('sylius_customer_group_code'));
    inputCode.click();
    inputCode.clear();
    inputCode.sendKeys('aux');

    //cy.get('#sylius_customer_group_name').clear('n');
    //cy.get('#sylius_customer_group_name').type('vinyl sale 100');
    const inputName = await driver.findElement(By.id('sylius_customer_group_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('vinyl sale 100');

    //cy.get('.labeled > .plus').click();
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();
    
    cy.get('.breadcrumb > [href="/admin/customer-groups/"]').click();
    
    //cy.get('#criteria_search_value').clear('1');
    await driver.findElement(By.id('criteria_search_value')).sendKeys('100');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'Wholesale 100');
  }); */

/*   it('sort reverse alphabetically by "name"', async () => {
    await driver.findElement(By.linkText('Groups')).click();

    cy.get('.sorted').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'Wholesale 100');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('tbody > :nth-child(3) > :nth-child(3)').should('have.text', 'Retail');
  });
 */
/*   it('sort alphabetically by "code"', async () => {
    await driver.findElement(By.linkText('Groups')).click();

    cy.get('.sort').click();
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.text', 'aux');
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'retail');
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('have.text', 'wholesale');
  }); */

/*   it('filter by starting with "v" then clear the filter', async () => {
    await driver.findElement(By.linkText('Groups')).click();

    cy.get('#criteria_search_type').select('starts_with');
    
    //cy.get('#criteria_search_value').clear('v');
    //cy.get('#criteria_search_value').type('v');
    await driver.findElement(By.id('criteria_search_value')).sendKeys('v');

    //cy.get('.blue').click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    cy.get('tbody > .item > :nth-child(3)').should('have.text', 'vinyl sale 100');
    cy.get('.loadable > a.ui').click();
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('be.visible');
    cy.get('tbody > :nth-child(2) > :nth-child(3)').should('be.visible');
    cy.get('tbody > :nth-child(3) > :nth-child(3)').should('be.visible');
  }); */

/*   it('create a new group called test', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Click on Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert the code for the new group
    const inputCode = await driver.findElement(By.id('sylius_customer_group_code'));
    inputCode.click();
    inputCode.clear();
    inputCode.sendKeys('test');

    // Insert the name for the new group
    const inputName = await driver.findElement(By.id('sylius_customer_group_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Test');

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that group has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Customer group has been successfully created.'));
  });

  it('try to create a new group with existing code', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Click on Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert the code for the new group
    const inputCode = await driver.findElement(By.id('sylius_customer_group_code'));
    inputCode.click();
    inputCode.clear();
    inputCode.sendKeys('retail');

    // Insert the name for the new group
    const inputName = await driver.findElement(By.id('sylius_customer_group_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Retail');

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert the error mesages
    const errorText = await driver.findElement(By.css('*[class^="ui red pointing label sylius-validation-error"]')).getText();
    assert(errorText.includes('Customer group code has to be unique.'));
  
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });

  it('create a new group different code but existing name', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Click on Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert the code for the new group
    const inputCode = await driver.findElement(By.id('sylius_customer_group_code'));
    inputCode.click();
    inputCode.clear();
    inputCode.sendKeys('new_retail');

    // Insert the name for the new group
    const inputName = await driver.findElement(By.id('sylius_customer_group_name'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('Retail');

    // Click on Create button
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();

    // Assert that group has been created
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Customer group has been successfully created.'));
  });

  it('remove the group test', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Type in value input to search for specify group
    await driver.findElement(By.id('criteria_search_value')).sendKeys('test');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in delete of the last group
    const buttons = await driver.findElements(By.css('*[class^="ui red labeled icon button"]'));
    await buttons[buttons.length - 1].click();

    // Click on yes to confirm
    await driver.findElement(By.id('confirmation-button')).click();

    // Assert that group has been delete
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Customer group has been successfully deleted.'));

  });

  it('remove the group new_retail by checkbox', async () => {
    // Click in groups in side menu
    await driver.findElement(By.linkText('Groups')).click();

    // Type in value input to search for specify group
    await driver.findElement(By.id('criteria_search_value')).sendKeys('new_retail');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in the checkbox of the last group
    const checkboxes = await driver.findElements(By.css('*[class^="bulk-select-checkbox"]'));
    await checkboxes[checkboxes.length - 1].click();

    // Click on the first delete button
    const buttons = await driver.findElements(By.css('*[class^="ui red labeled icon button"]'));
    await buttons[0].click();

    // Click on yes to confirm
    await driver.findElement(By.id('confirmation-button')).click();

    // Assert that group has been delete
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Customer_groups have been successfully deleted.'));

  }); */

  // Implement the remaining test cases in a similar manner
});
