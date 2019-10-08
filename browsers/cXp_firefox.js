//once IDs are present though, we can still use the ID as reference in Xpath
//note that any error on these presicion tools will be caught by the [try catch] statement

//for elements that we can provide inputs

const {Builder, By, Key, until} = require('selenium-webdriver');

const webDr = require("selenium-webdriver"); const firefox = require('selenium-webdriver/firefox');
require("geckodriver");
const fs = require('fs');
const os = require('os');


async function testInFirefox()
{
	
	console.log("Preparing Firefox"); 

	//let options = new firefox.Options().setBinary(os.homedir() + '/AppData/Local/Mozilla Firefox/firefox.exe');  
	//these are Firefox settings
	let options = new firefox.Options().setBinary(os.homedir() + 
	 '/AppData/Local/Mozilla Firefox/firefox.exe').setProfile(os.homedir() + 
	 '/AppData/Roaming/Mozilla/Firefox/Profiles/7h7p59zc.Default User');  //99lzhjna.default');  	 
	 
	 let driver = new webDr.Builder()
          .forBrowser('firefox').setFirefoxOptions(options).build();
	 //let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.firefox()).build();
	 
	 console.log("Firefox is setup and ready!");

	return driver; 	
}


module.exports.testInFirefox = testInFirefox;