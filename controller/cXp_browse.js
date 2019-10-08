/*
	Jun 26, 2019:
        --this function simply loads the url from the browser
        -- for mobile devices... not sure yet
*/
//for buttons, checkboxes, options...
const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
async function xp_browse(yourNote, url, delay, driver){
	//implement a... try catch?
	try{
        //LOAD the provided url
        await driver.get(url);
        await driver.sleep(delay); //sites may take a while to load.       
		return yourNote + ' -cXp_browse- delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
		//return ex; //will this get caught by the main function's try catch?
	    return Promise.reject(new Error(ex));
	}
	
	
}

async function xp_newTab(yourNote, url, delay, driver){
	//implement a... try catch?
	try{

		await driver.executeScript('window.open("' + url + '");');
		
		await driver.sleep(delay); //make sure tab/ window is open, then load
        //LOAD the provided url
        await driver.get(url);
        await driver.sleep(delay); //sites may take a while to load.       
		return yourNote + ' -cXp_browse- delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
		//return ex; //will this get caught by the main function's try catch?
	    return Promise.reject(new Error(ex));
	}
	
	
}




module.exports.xp_browse = xp_browse;
module.exports.xp_newTab = xp_newTab;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;

