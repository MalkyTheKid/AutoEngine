//once IDs are present though, we can still use the ID as reference in Xpath
//note that any error on these presicion tools will be caught by the [try catch] statement

//for elements that we can provide inputs

const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	

var cXp_cleartxt = require("./cXp_cleartxt.js");//__dirname + "/../cXp_cleartxt.js"); 
const xp_cleartxt = cXp_cleartxt.xp_cleartxt;

async function xp_textboxes(yourNote, hook, toInput, theInput, delay, driver, element)
{	
	try{
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(delay/2); //200 scrolling is way too fast, lol
		//ProvideInput 
		
		
		await driver.wait(until.elementLocated(By.xpath(toInput)), waitUntil, ' err : Input element not present' + toInput);
		element = await driver.findElement(By.xpath(toInput));
		
		//hmmm... what if we send delete or backspace keys first?
		//make sure that the element is clear, before providing input?	
		/*var currval = element.getText();
		while (currval != ''){
			await element.sendKeys(webDr.Key.DELETE);
			await element.sendKeys(webDr.Key.BACK_SPACE);		
			currval = element.getText();
		}*/
		
		
		await xp_cleartxt(element, driver);
		
		await element.sendKeys(theInput); await driver.sleep(delay + browserSpec); 
		
		return yourNote;
		//Promise.resolve(yourNote);
	}catch(ex)
	{
		return Promise.reject(new Error("The element does not exist! " + ex)); //this means it's required...
	}
}



module.exports.xp_textboxes = xp_textboxes;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;