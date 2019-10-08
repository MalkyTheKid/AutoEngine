/*
	Jun 26, 2019:
        --this function simply sleeps the driver if the user wants to sleep it.
        -- for mobile devices... not sure yet
*/
const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
async function xp_wait(yourNote, delay, driver){
	
	try{
        
        await driver.sleep(delay); //sites may take a while to load. 
        
		return yourNote + ' -cXp_wait- delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
	    return Promise.reject(new Error(ex)); //returns the error back to the function caller
	}
	
	
}

module.exports.xp_wait = xp_wait;
module.exports.waitUntil = waitUntil;
module.exports.browserSpec = browserSpec;

