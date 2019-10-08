//once IDs are present though, we can still use the ID as reference in Xpath
//note that any error on these presicion tools will be caught by the [try catch] statement

//for elements that we can provide inputs

const {Builder, By, Key, until} = require('selenium-webdriver');

const webDr = require("selenium-webdriver");
//require('chromedriver');
const fs = require('fs');


async function testInEdge()
{
	
	
	console.log("Preparing Microsoft Edge"); 


	let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.edge()).build(); 

	console.log("Edge is setup and ready!");
	
	return driver; 	
}


module.exports.testInEdge = testInEdge;