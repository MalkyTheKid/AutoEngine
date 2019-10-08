/*
	RCM Notes:
		May 23, 2019: File was created 
						- Setup files properly
*/


//for QA to Modify. 
var baseUrl='http://wststweb-lms/LetterManagement/Default.aspx';
var csName = 'CaseName'; 
var QAInvolved = 'Malcolm Salvador';
var testIn ='chrome'; 
var browserSpec = 1000; 
var linkDelay = 18000;
var logoHook = ''; 
var waitUntil = 10000; //ON: 20000, others: 8000  how long until page returns an error for missing elements? in seconds



//!!!Do not modify below here please..
//required libraries. 
const fs = require("fs"); const fsprom = require("fs").promises; //for files
const path = require('path');
const os = require('os');
require("geckodriver");
const webDr = require("selenium-webdriver"); const firefox = require('selenium-webdriver/firefox'); //only for firefox
require('chromedriver');
const dtL = require('node-datetime');
const nodemailer = require('nodemailer');
const {Builder, By, Key, until} = require('selenium-webdriver');
const scrape = require('website-scraper');
const replacer = require('replace');

//Call our custom events
const cshot = require(__dirname + "/../controller/cTakeScreenShot.js");
const cLister = require(__dirname + "/../controller/cAddToList.js"); var scrnsList = []; //this will hold all our screenshots
const cMailer = require(__dirname + "/../controller/cMailer.js");
var cXp_clicker = require(__dirname + "/../controller/cXp_clicker.js"); cXp_clicker.waitUntil=waitUntil; cXp_clicker.browserSpec=browserSpec; 
const xp_clicker = cXp_clicker.xp_clicker;
var cXp_selector = require(__dirname + "/../controller/cXp_selector.js"); cXp_selector.waitUntil=waitUntil; cXp_selector.browserSpec=browserSpec; 
const xp_selector = cXp_selector.xp_selector;
var cXp_cleartxt = require(__dirname + "/../controller/cXp_cleartxt.js"); 
const xp_cleartxt = cXp_cleartxt.xp_cleartxt;
var cXp_textboxes = require(__dirname + "/../controller/cXp_textboxes.js"); cXp_textboxes.waitUntil=waitUntil; cXp_textboxes.browserSpec=browserSpec; 
const xp_textboxes = cXp_textboxes.xp_textboxes;
var cXp_picture = require(__dirname + "/../controller/cXp_picture.js"); cXp_picture.waitUntil=waitUntil; cXp_picture.browserSpec=browserSpec; 
const xp_picture = cXp_picture.xp_picture;
var cXp_switchtab = require(__dirname + "/../controller/cXp_switchtab.js"); cXp_switchtab.waitUntil=waitUntil; cXp_switchtab.browserSpec=browserSpec; 
const xp_switchtab = cXp_switchtab.xp_switchtab;

//browsers
var cXp_chrome = require(__dirname + "/../browsers/cXp_chrome.js"); 
const xp_chrome = cXp_chrome.testInChrome;
var cXp_firefox = require(__dirname + "/../browsers/cXp_firefox.js"); 
const xp_firefox = cXp_firefox.testInFirefox;
var cXp_ie = require(__dirname + "/../browsers/cXp_ie.js"); 
const xp_ie = cXp_ie.testInIE;


//setup project variables
var driver;  var options;
var element;
var actName ='';
var dt = dtL.create();
dt = dt.format('Y-m-d--H@M@S');
var commodityType ='';
var currFoldr = __dirname + "/../ScrnShots/" + dt + csName;
var pName = ''; //page name




//create location where we will save screenshots
async function fileSet (strFname) {
	fname = currFoldr + strFname;
	console.log(fname + ' is the filename');
	return true;
}

//create a funciton that sets the duration
var currDT;
var prevDT = dtL.create();//holds previous time
var durTime;
function durSet(){
	currDT = dtL.create();
	durTime = Math.abs(currDT.getTime() - prevDT.getTime()) / 1000;	  
	//console.log('curr : ' + currDT  + '|| Prev: ' + prevDT + ' || Dur: ' + durTime + ' seconds');
	prevDT = currDT;
	
	return durTime;
	//currDT = currDT.format('Y-m-d--HMS');
	//var fn = file + 'crd' + currDT + 'dur' + durTime + 's.png';
}


//START OF THE TEST
async function beginTest() {
   
    
	
	
	//create folder for the screenshots
	currFoldr = __dirname + "/../ScrnShots/" + dt + csName;	
	fs.mkdir(currFoldr, err => { 
			if (err && err.code != 'EEXIST') throw 'err' //error occured
	   });  
	
	 
	 //Decide which browser we are going to test. 
	  if(testIn =='chrome') 
	  { await testInChrome(); }
	  else if(testIn =='firefox') 
	  { await testInFirefox(); }
	  else if(testIn =='ie') 
	  { await testInIE(); } 
	  //else if(browseIn =='edge') { let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.edge()).build(); }
	 
	 
	 //okay, since we are finished, let's send the email
	 //mail the results
	  try {
		  console.log(await cMailer.mailIt(csName, scrnsList));
	  }catch(ex){
		  console.log("Error on sending email.." + ex);
	  }
	
}

//Particular browser instansiation.
async function testInChrome()
{
	
	//we setup chrome. It's all in file (browsers/cXp_chrome)
	let driver =  await xp_chrome();
	
	//start the test. Below is all the steps for the test.
	await allSteps(driver, 'Chrome');
	
	
	//after the test has been completed, close the driver.
	 driver.quit(); 
	 return csName + " completed";
	
	
}
async function testInIE()
{
	//let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.ie()).build();
	let driver =  await xp_ie();
	await allSteps(driver, 'IE');
	
	//after the test has been completed, close the driver.
	  driver.quit(); 
	 return csName + " completed";
	
}

async function testInFirefox()
{
	 
	 let driver =  await xp_firefox();
	
	 
	 await allSteps(driver, 'Firefox');
	 
	//after the test has been completed, close the driver.
	  driver.quit(); 
	 return csName + " completed";
	
	 
}



//!!! THE ACTUAL STEPS.
async function allSteps(driver, testIn){
    
	//[action 0: Simply load the url.]
	await loadUrl(driver, testIn);
	 
	//[action 1: Provide value.] 
	await provideValue(driver, testIn) 
}

async function loadUrl(driver, testIn){
	 //[action 0: setup the project.]
	 try
	 {
		actName = "LoardURL";
		//LOAD the Admin url.
		  await driver.get(baseUrl);

		 driver.sleep(3000);
		
		//Page has been loaded
		console.log(await xp_picture(1000, driver, 'success', 
			'Admin page Loaded', actName, currFoldr, scrnsList));
		
		//now, we go to review case management
		actName = "GotoReviewCaseManagement";
		console.log( await xp_clicker(
			actName + ': clicked on ReviewCase Management',
			'//*[@id="menu"]/div[1]/div[2]/a', 
			'//*[@id="menu"]/div[1]/div[2]/a', 
			500, driver, element));
			
			
		//switch to the new window:			
		console.log(await xp_switchtab("Switch the tab now to the newly opened one", 1, 
		500, driver, element));
		
		//wait until the page loads... may take some time. 15 seconds to be precise
		console.log("page is being loaded.. please wait for 15 seconds");
		await driver.sleep(20000);
		
		//Page has been loaded
		
		console.log(await xp_picture(1000, driver, 'success', 
			'Review Case Management Clicked', actName, currFoldr, scrnsList));
		
		//*[@id="menu"]/div[2]/div[2]/a
		//*[@id="menu"]/div[3]/div[2]/a
		
		
		
		
		
	 }catch(ex)
	 {
		 
		//Log the error and take screenshots
		console.log(await xp_picture(1000, driver, 'ERROR:' + ex, 
			"The errors might be: <br> " + 
		"Either chrome, firefox, edge or " + 
		"internet explorer might not be available, <br> " + 
		" or the file location where we are saving the file is unavailable to us.  ", actName, currFoldr, scrnsList));


		await cMailer.mailIt(csName, scrnsList);		
		return Promise.reject(new Error(ex));
	 } 
}

async function provideValue(driver, testIn){
	 //[action 0: setup the project.]
	 try
	 {
		actName = "ProvideValue";
		//Provide value to element: //*[@id="mat-input-1"]
		 console.log(await xp_textboxes(
		actName + ': FirstName',
		'//*[@id="mat-input-1"]', 
		'//*[@id="mat-input-1"]',
		"Potato",
		500, driver, element));
		
		//*[@id="mat-input-1"]
		
		 driver.sleep(1000);
		
		//Value provided
		console.log(await xp_picture(1000, driver, 'success', 
			'Value Provided', actName, currFoldr, scrnsList));
		
		
		
	 }catch(ex)
	 {
		//Log the error and take screenshots
		console.log(await xp_picture(1000, driver, 'ERROR:' + ex, 
			'Was not able to provide value!', actName, currFoldr, scrnsList));
		
		
		await cMailer.mailIt(csName, scrnsList);		
		return Promise.reject(new Error(ex));
	 } 
}


//!!! Precision tools, uses xpath. A little fragile... but most reliable since no elements have ID and classes

//!!-- Apr 10, 2019 pg downloader
//Mar 26, 2019 : Page downloader!
async function acct_xp_pageDL(toDL, saveLoc, delay, driver, yourNote){
	try {
		//const pgsource = await driver.getPageSource(); driver.sleep(delay);
		
		//try some delay too... maybe the page hasn't downloaded yet 
		
		var pgsource = await driver.findElement(By.xpath(toDL)).getAttribute('innerHTML'); //  // await driver.getAttribute('innerHTML');//driver.findElement(By.xpath("html")); //I need to get the html!
		
		
		
		await fs.writeFileSync(saveLoc,//currFoldr + '/GoogleAssistantResult.html', 
			pgsource); driver.sleep(delay);
		
		//now.. how do we send this as an email?
		
		return yourNote;
		
	} catch (ex) {
		return Promise.reject(new Error(ex));
	}
}

//Mar 27,2019 : webpage scraper, since the page cannot be simply downloaded...
async function acct_xp_pageScrape(toDL, saveLoc, delay, driver, yourNote){
	try {
		
		
		///
		var options = {
		  urls: [toDL],
		  directory: saveLoc,
		};
		
		//download using the referenced scraper.
		var result = await scrape(options); driver.sleep(delay);
		
		return yourNote;
		
	} catch (ex) {
		return Promise.reject(new Error(ex));
	}
}



//!!! serve the variables over.
//we call the cases. The beauty of this is that they will run asynchronously and I can call as many as I want
	module.exports.QAInvolved = function(val){
		QAInvolved = val;
	}
	module.exports.csName = function(val){
		csName= val;
	}
	module.exports.baseUrl = function(val){
		baseUrl = val;
	}
	module.exports.testIn = function(val){
		testIn = val;
	}
	module.exports.browserSpec = function(val){ browserSpec = val; }
	module.exports.linkDelay = function(val){ linkDelay = val; }
	
	var steps;
	module.exports.steps = function(val){ steps = val; }
	

	
	module.exports.beginTest = beginTest;


