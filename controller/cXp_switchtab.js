/*
	Apr 02, 2019:
		--Alright so problem is: [waitUntil] and [browserSpec] kinda violates SOLID... I guess it has to be fixed for now
	Jul 02, 2019:
		--tabNo begins with 0. WHich means the 2nd tab is 1, 3rd tab is 2, so on so forth	
*/
//for buttons, checkboxes, options...
const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
async function xp_switchtab(yourNote, tabNo, delay, driver, element){
	//implement a... try catch?
	
	
	try{
		
		var allTabs = await driver.getAllWindowHandles(); await driver.sleep(browserSpec); 
		await console.log("+++ the current tabs are: +++ " + allTabs);
		await driver.switchTo().window(allTabs[tabNo]);
		await console.log("+++ switched to: +++ " + allTabs[tabNo]);
		
		
		return yourNote + ' delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
		//return ex; //will this get caught by the main function's try catch?
	    return Promise.reject(new Error(ex));
	}
	
	
}






module.exports.xp_switchtab = xp_switchtab;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;

