/*
	Apr 02, 2019:
		--Alright so problem is: [waitUntil] and [browserSpec] kinda violates SOLID... I guess it has to be fixed for now
*/
//for buttons, checkboxes, options...
const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
async function xp_clicker(yourNote, hook, toClick, delay, driver, element){
	
	
	try{	
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), 
			waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(200); //scrolling is way too fast, lol
		//click
		await driver.wait(until.elementLocated(By.xpath(toClick)), 
			waitUntil,'err : toClick not present' + toClick);
		element = await driver.findElement(By.xpath(toClick));
		await element.click(); await driver.sleep(delay + 500 + browserSpec); 
		
		return yourNote + ' delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
		//return ex; //will this get caught by the main function's try catch?
	    return Promise.reject(new Error(ex));
	}
	
}






module.exports.xp_clicker = xp_clicker;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;

