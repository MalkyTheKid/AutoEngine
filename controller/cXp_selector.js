const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
//for menus like <select>, <option>
async function xp_selector(yourNote, hook, toClick, 
	toSelect, delay, driver, element){	
	
	try
	{
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), 
			waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", 
			element); await driver.sleep(200); 
			//scrolling is way too fast, lol
		
		//click
		await driver.wait(until.elementLocated(By.xpath(toClick)), 
			waitUntil, 'err : toClick not present' + toClick);
		element = await driver.findElement(By.xpath(toClick));
		await element.click(); await driver.sleep(delay + browserSpec); 
		
		//toSelect (now that's clicked, let us select the inner element)
		await driver.wait(until.elementLocated(By.xpath(toSelect)), waitUntil, 'err : toSelect not present' + toSelect);
		element = await driver.findElement(By.xpath(toSelect));
		await element.click(); await driver.sleep(delay + browserSpec);
		
		return yourNote;
	}
	catch(ex)
	{
		return Promise.reject(new Error(ex));
	}
}

module.exports.xp_selector = xp_selector;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;

