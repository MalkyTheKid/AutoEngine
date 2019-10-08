//once IDs are present though, we can still use the ID as reference in Xpath
//note that any error on these presicion tools will be caught by the [try catch] statement

//for elements that we can provide inputs

const {Builder, By, Key, until} = require('selenium-webdriver');

const webDr = require("selenium-webdriver");
require('chromedriver');
const fs = require('fs');


async function testInChrome()
{
	
	var chromeCapabs = webDr.Capabilities.chrome();
	//chromeCapabs.Options.Capabilities.addExtensions('Tag-Assistant-(by-Google)_v18.319.0.crx');
	
	//let's provide chrome extensions
	
	//*NOTE* sometimes the chrome won't proceed with the test because of an extension..
	//*try diagnosing by commenting one of the extensions below
	chromeCapabs.set("chromeOptions",  
			{"extensions": [
						fs.readFileSync("./browsers/GTassistant.crx", "base64"),
						fs.readFileSync("./browsers/FBPH_v1.1.6.crx", "base64"),
						fs.readFileSync("./browsers/TMI_v3.1.crx", "base64")
				]}
		);
	
	
	console.log("Preparing chrome Extensions"); 

	let driver = await new webDr.Builder().forBrowser('chrome').withCapabilities(chromeCapabs).build();
	

	console.log("Chrome is setup and ready!");
	
	return driver; 	
}


module.exports.testInChrome = testInChrome;