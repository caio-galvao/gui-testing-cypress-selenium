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

  it('create a new group called test', async () => {
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

  it('test case 3', async () => {
    // Implement your test case 3 code here
  });

  // Implement the remaining test cases in a similar manner
});
