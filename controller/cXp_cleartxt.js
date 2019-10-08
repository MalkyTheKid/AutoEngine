const {Builder, By, Key, until} = require('selenium-webdriver');
const webDr = require("selenium-webdriver");

async function xp_cleartxt(element, driver){
	 var theString = await element.getAttribute('value');
	 //console.log('STRING IS: ' + theString);
	 theString = await theString.length;
	 //console.log('TOTAL STRING COUNT: ' + theString);
	
	//you can identify using the "browserIn" variable 
	 while(theString !=0)
		{
			try{
				await element.sendKeys(webDr.Key.DELETE); //for chrome and ...firefox?
			}catch(ex){
				await console.log(ex);
			}
			
			try{
				await element.sendKeys(webDr.Key.BACK_SPACE); //for IE... is there a way for me to identify this? 
			}
			catch(ex){
				await console.log(ex);
			}
			theString = await theString - 1;
		}
		return "text cleared";
}

module.exports.xp_cleartxt = xp_cleartxt;
