const { Builder } = require("selenium-webdriver");

(async function testAPI() {

  let driver = await new Builder().forBrowser("chrome").build();

  try {

    await driver.get("http://localhost:5000/api/pipeline");

  } finally {

    await driver.quit();

  }

})();