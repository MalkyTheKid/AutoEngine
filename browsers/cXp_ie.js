//once IDs are present though, we can still use the ID as reference in Xpath
//note that any error on these presicion tools will be caught by the [try catch] statement

//for elements that we can provide inputs

const {Builder, By, Key, until} = require('selenium-webdriver');

const webDr = require("selenium-webdriver"); 
const fs = require('fs');
const os = require('os');


async function testInIE()
{
	console.log("Preparing IExplorer"); 
	let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.ie()).build();
	
	console.log("IE is setup and ready!");
	
	return driver; 	
}


module.exports.testInIE = testInIE;