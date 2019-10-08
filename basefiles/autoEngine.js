/*
	RPM Engine Notes:
		Jun 25, 2019: File was created 
					- Setup files properly
		Jul 02, 2019:
					- Start the test, based on TestSteps.json
					- beginTest initializes the tests.
					- testIn can be browsers, OR mobile devices! (create a different Engine)
*/


//Testing Variables
var baseUrl='http://wststweb-lms/LetterManagement/Default.aspx';
var caseName = 'CaseName'; 
var QAInvolved = 'Malcolm Salvador';
var testIn ='chrome'; 
var browserSpec = 1000; 
var delay = 18000;
var waitUntil = 20000; 
var steps;




//!!!Do not modify below here please..
//required libraries. 
const fs = require("fs"); 
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
//Screenshots and Emailing
var scrnsList = []; //this will hold all our screenshots
var cXp_picture = require(__dirname + "/../controller/cXp_picture.js"); cXp_picture.waitUntil=waitUntil; cXp_picture.browserSpec=browserSpec; 
const xp_picture = cXp_picture.xp_picture;
const cMailer = require(__dirname + "/../controller/cMailer.js");

//Verbs
var cXp_clicker = require(__dirname + "/../controller/cXp_clicker.js"); cXp_clicker.waitUntil=waitUntil; cXp_clicker.browserSpec=browserSpec; 
const xp_clicker = cXp_clicker.xp_clicker;
var cXp_selector = require(__dirname + "/../controller/cXp_selector.js"); cXp_selector.waitUntil=waitUntil; cXp_selector.browserSpec=browserSpec; 
const xp_selector = cXp_selector.xp_selector;
var cXp_cleartxt = require(__dirname + "/../controller/cXp_cleartxt.js"); 
const xp_cleartxt = cXp_cleartxt.xp_cleartxt;
var cXp_textboxes = require(__dirname + "/../controller/cXp_textboxes.js"); cXp_textboxes.waitUntil=waitUntil; cXp_textboxes.browserSpec=browserSpec; 
const xp_textboxes = cXp_textboxes.xp_textboxes;
var cXp_switchtab = require(__dirname + "/../controller/cXp_switchtab.js"); cXp_switchtab.waitUntil=waitUntil; cXp_switchtab.browserSpec=browserSpec; 
const xp_switchtab = cXp_switchtab.xp_switchtab;
var cXp_wait = require(__dirname + "/../controller/cXp_wait.js"); cXp_wait.waitUntil=waitUntil; cXp_wait.browserSpec=browserSpec; 
const xp_wait = cXp_wait.xp_wait;

var cXp_browse = require(__dirname + "/../controller/cXp_browse.js"); cXp_browse.waitUntil=waitUntil; cXp_browse.browserSpec=browserSpec; 
const xp_browse = cXp_browse.xp_browse;
const xp_newTab = cXp_browse.xp_newTab;



//browsers
var cXp_chrome = require(__dirname + "/../browsers/cXp_chrome.js"); 
const xp_chrome = cXp_chrome.testInChrome;
var cXp_firefox = require(__dirname + "/../browsers/cXp_firefox.js"); 
const xp_firefox = cXp_firefox.testInFirefox;
var cXp_ie = require(__dirname + "/../browsers/cXp_ie.js"); 
const xp_ie = cXp_ie.testInIE;
var cXp_edge = require(__dirname + "/../browsers/cXp_edge.js"); 
const xp_edge = cXp_ie.testInEdge;


//setup project variables
var driver;  var options;
var element;
var actName ='';
var dt = dtL.create();
dt = dt.format('Y-m-d--H@M@S');

var currFoldr;


//START OF THE TEST
beginTest();
async function beginTest() {
   
	console.log("STARTING UP");
    
	//create folder for the screenshots
	/*
		currFoldr = __dirname + "/../ScrnShots/" + dt + caseName + QAInvolved;
		fs.mkdir(currFoldr, err => { 
				if (err && err.code != 'EEXIST') throw 'err' //error occured
		});  
	*/
	 var driver;
	 //Decide which browser we are going to test. 
	if(testIn =='chrome') 
	{  driver =  await xp_chrome(); }
	else if(testIn =='firefox') 
	{  driver =  await xp_firefox(); }
	else if(testIn =='ie') 
	{  driver =  await xp_ie(); } 
	  
	//initialize to the base URL
	console.log(await xp_browse("Loading base url", baseUrl, 3000, driver));

	try{

		await allSteps(steps, driver);

		//we're done with the test!
		console.log("Test " + caseName + " is now done!!!!");
	}catch (ex){
		console.log("Errors on " + caseName + " ... please consult email");
	}
	
    
     
}


//executes all the "steps" in TestSteps.json for that case
async function allSteps(steps, driver){
    
	//the steps are:
	console.log("Proceeding with the steps: ");
	//console.log(steps);
	//iterate on all the items
	var event; var hasHook;	var stepName;

	for(var ii in steps){
		try{
			console.log(steps[ii]);
			event = await steps[ii].event;
			stepName = await steps[ii].stepName.replace(/ /g, "_");
			//determine if a hook was declared. If not we'll just use the identifier
			if (steps[ii].hook){hasHook = steps[ii].hook}  else { hasHook = steps[ii].identifier }
	
			console.log(event);

			//discern what the event is:
			if(event === 'type'){
				console.log(await xp_textboxes(
					stepName,
					hasHook, 
					steps[ii].identifier,
					steps[ii].write, steps[ii].delay, driver, element));
			}
			else if(event === 'click'){
				console.log(await xp_clicker(
					stepName,
					hasHook, 
					steps[ii].identifier, 
					steps[ii].delay, driver, element));
			}
			else if(event === 'dropdown'){
				console.log(await xp_selector(
					stepName,
					hasHook, 
					steps[ii].identifier, 
					steps[ii].identifier + "/option[text()[contains(., '" + steps[ii].option + "')]]", 
					steps[ii].delay, driver, element));
			}
			else if(event === 'newTab'){ //opens new tab.
				//if no url is provided, then do google.
				var tempUrl = 'www.google.com';
				if (steps[ii].url){ tempUrl = steps[ii].url}
				console.log(await xp_browse(stepName, tempUrl, 
					steps[ii].delay, driver));
			}
			else if(event === 'switchTab'){ //switches to one of your tabs. Remember to count from 0.
				console.log(await xp_switchtab(stepName + " - switching tabs ", 
					steps[ii].tabNumber, steps[ii].delay, driver, element));
			}
			else if (event === 'wait'){ //for simply waiting for something to load
				console.log(await xp_wait(stepName, steps[ii].delay, driver));
			}	
			else if (event === 'screenshot'){ //for just taking screenshots
				console.log(await xp_picture(steps[ii].delay, driver, 'success', 
					event + ' - Screenshot taken for:  ' + stepName, stepName, currFoldr, scrnsList));	
			}
			else if (event === 'browse'){
				console.log(await xp_browse(stepName, steps[ii].url, steps[ii].delay, driver));
			}

			
			else if(event === 'initializeTagTesting'){ //for google tag and fb pixel checks
				await initialize_tag_testing(driver);

		   }

			//take a Photo of the successful attempt at this point, unless screenshot was already invoked.
			if(event != 'screenshot'){ console.log(await xp_picture(delay, driver, 'success', event + ' - Success Note on ' + stepName, stepName, currFoldr, scrnsList)); }
			
			
			//delay between the steps. Otherwise the automation might be too quick for the app
			await driver.sleep(delay + browserSpec);



		}catch(ex){
			//something failed with the engine. Email the error and quit the test
			console.log(await xp_picture(delay, driver, 'ERROR: ' + stepName, 
				event + ' Error : ' + ex, stepName, currFoldr, scrnsList));
			await driver.quit();
			console.log(await cMailer.mailIt(caseName, scrnsList));
			console.log(await caseName + " was not completed... please see errors");
			return Promise.reject(new Error(ex));	
		}	

	} //end of for*

	//there were no errors. Let's stop the driver then send the email
	await driver.quit();
	console.log(await cMailer.mailIt(caseName, scrnsList));

}

async function initialize_tag_testing(driver){
	
	await console.log("Beggining Tag Testing");
	
	try{
		
		actName = "BeginTagTests";
		///Google Tag Injector, inject the tags first!
		await driver.get("chrome-extension://ooninanccdmjbcmghimhdfpeklpmlllg/popup.html");
		await driver.sleep(500);
		
		//load the injector, and add the container ID (from the test environment).
		console.log(await xp_textboxes(
		'Chrome : include the ID',
		'//*[@id="GTM_ID"]', 
		'//*[@id="GTM_ID"]',
		gtmID,
		200, driver, element));
		
		//start the injection
		
		console.log(await xp_clicker(
		'Chrome: Inject!',
		'//*[@id="gobtn"]', 
		'//*[@id="gobtn"]', 
		500, driver, element));
		
		console.log(await xp_picture(1000, driver, 'success', 
		'QA tag has been injected now.', "chrome_tag_injector", currFoldr, scrnsList));
		
		///Google Tag Assistant
		await driver.get("chrome-extension://kejbdjndbnbjgmefkgdddjlbokphdefk/popup2.html");
		await driver.sleep(500);
		
		//first, click on Done (welcome-screen-done-button)
		console.log(await xp_clicker(
		'Chrome: Enable Assistant',
		'//*[@id="welcome-screen-done-button"]', 
		'//*[@id="welcome-screen-done-button"]', 
		500, driver, element));
		
		//load the analytics page, and enable the assistant.
		console.log(await xp_clicker(
		'Chrome: Enable Assistant',
		'//*[@id="turn-on-ta"]', 
		'//*[@id="turn-on-ta"]', 
		500, driver, element));
		
		//now, start recording issues.
		console.log(await xp_clicker(
		'Chrome: Start Assistant Recording ',
		'//*[@id="start-recording-issues"]', 
		'//*[@id="start-recording-issues"]', 
		500, driver, element));
	
		//
		console.log(await xp_picture(1000, driver, 'success', 
		'Tag Assistant is now recording', "chrome_TagAssistantsetup", currFoldr, scrnsList));
		
	
	}catch(ex){
		
		console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'was not able to complete setup on Tags!', "Google Tags and analytics testing.", currFoldr, scrnsList));
		
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(ex));
	  }
}

async function end_tag_testing(driver){
	
	await console.log("Closing Tag Testing, and viewing results.");
	
	try{
		actName = "EndTagTests";
		///Stop Google Tag Assistant first.
		await driver.get("chrome-extension://kejbdjndbnbjgmefkgdddjlbokphdefk/popup2.html");
		await driver.sleep(500);
		
		
		//Stop the recording.
		console.log(await xp_clicker(
		'Chrome: Stop assistant recording',
		'//*[@id="stop-recording-issues"]', 
		'//*[@id="stop-recording-issues"]', 
		500, driver, element));
		
		
		console.log(await xp_clicker(
		'Chrome: Look at the full report ',
		'//*[@id="show-full-report"]', 
		'//*[@id="show-full-report"]', 
		500, driver, element));
	
		//now, find a way to look at the other tab and download as HTML
		//Tab management
		//Parent
		var parentWindow = await  driver.getWindowHandle(); //gives you a parent window
		//children
		var lastWindow = await driver.getAllWindowHandles(); //jeez... we need the All keyword
		await console.log("+++ the last window is: +++ " + lastWindow);
		await driver.switchTo().window(lastWindow[1]);//.Window(driver.WindowHandles.Last());
		
		
		
		
		//ok let's scrape the website instead, since downloading does not work
		//get the url
		var currURL = await driver.getCurrentUrl();
		
		await console.log("The url for results: " + currURL);
		
		//now SCRAPE it.
		/*
		await acct_xp_pageScrape(currURL, currFoldr + '/GoogleAssistantResult.html',1500, driver, 
			"Analytics page saved successfully. Will be attached to the email.");
		*/
		
		
		//scraping didn't work... ok let's try downloading the pdf instead
		//lead to the pdf download. click on dismiss
		console.log(await xp_clicker(
		'Chrome: assistant reporting: click on Done',
		'/html/body/div[2]/md-dialog/div/button', 
		'/html/body/div[2]/md-dialog/div/button', 
		500, driver, element));
		
		//expand the reports
		console.log(await xp_clicker(
		'Chrome: assistant reporting: extending reports 1',
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[6]/button[2]/md-icon[1]', 
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[6]/button[2]/md-icon[1]', 
		500, driver, element));
		
		console.log(await xp_clicker(
		'Chrome: assistant reporting: extending reports 2',
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[6]/button[3]/md-icon[1]', 
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[6]/button[3]/md-icon[1]', 
		500, driver, element));
		
		//click on Print
		/*console.log(await xp_clicker(
		'Chrome: assistant reporting: clicked on print',
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[1]/button', 
		'/html/body/ui-view/div/div[2]/md-content/md-sidenav/div[1]/button', 
		500, driver, element));
		
		//NOW, download the file!
		//crap, it still doesn't work...	
		await acct_xp_pageDL('//*[@id="plugin"]', currFoldr + '/GoogleAssistantResult.html',1500, driver, 
			"Analytics page saved successfully. Will be attached to the email.");
		
		*/
		//we can't click on print... this might be troublesome.
		
		//for now, download the page
		await console.log(acct_xp_pageDL("/html/body/ui-view/div/div[2]/md-content/md-content", 
			currFoldr + '/GoogleAssistantResult.html',1500, driver, 
			"Analytics page saved successfully. Will try to attach to email."));
		await driver.sleep(3000);
		
		//and replace the width and the height to something smaller..
		/*
		await fs.readFileSync(currFoldr + '/GoogleAssistantResult.html', 'utf8', function (err,data) {
		  if (err) {
			return console.log(err);
		  }
		  var result = data.replace("width=100%", 'width=3%');
		  result = data.replace("height=100%", 'height=3%');
		  
		  console.log("data converted successfully!");
		  
		   fs.writeFile(currFoldr + '/GoogleAssistantResult.html', result, 'utf8', function (err) {
			 if (err) return console.log(err);
		  });
		});
		
		
		await replacer({
		  regex: 'width="100',
		  replacement: 'width="3',
		  paths: [currFoldr + '/GoogleAssistantResult.html'],
		  recursive: true,
		  silent: true,
		});
		await replacer({
		  regex: 'height="100',
		  replacement: 'height="3',
		  paths: [currFoldr + '/GoogleAssistantResult.html'],
		  recursive: true,
		  silent: true,
		});
		
		
		//try and download the file.
		var editHtml = await fsprom.readFile(currFoldr + '/GoogleAssistantResult.html', 'utf8');		
		var rsultHtml = await editHtml.replace(/width="100/g, 'width="3');
		rsultHtml = await rsultHtml.replace(/height="100/g, 'height="3');
		rsultHtml = await rsultHtml.replace(/\r?\n|\r/g, '');
		rsultHtml = await rsultHtml.replace('<button class="md-icon-button md-button md-taux-theme md-ink-ripple ng-hide" type="button" ng-transclude="" ng-show="ignoreCtrl.ignored" aria-label="Remove from Ignore list" aria-hidden="true"><md-icon md-svg-icon="add" class="md-taux-theme" role="img" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="3%" height="3%" viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg></md-icon></button>', ''); 
		 
		await fsprom.writeFile(currFoldr + '/GoogleAssistantResultModf.html', rsultHtml);
		
		await console.log("data converted successfully!");
		*/
		
		
		
		
		//well, downloaded the file.
		console.log(await xp_picture(1000, driver, 'success', 
		'Tag Assistant is now Disabled, and report attached. <br />' + 
		"Please visit <a href='" + currURL + "'>" + currURL + '</a> for the results', 
		"chrome_Tag_ReportDisabled", currFoldr, scrnsList));
		
		
		
		///Stop Google Tag Injector 
		await driver.get("chrome-extension://ooninanccdmjbcmghimhdfpeklpmlllg/popup.html");
		await driver.sleep(500);
		
		
		//For now, no need to stop the injection... since every new instance of google downloads a new one.
		/*
		console.log(await xp_clicker(
		'Chrome: deactivate injection',
		'//*[@id="deactivate"]', 
		'//*[@id="deactivate"]', 
		500, driver, element));
		
		console.log(await xp_picture(1000, driver, 'success', 
		'injector has stopped recording now.', "chrome_injector_stopped"));
		
		
		//uh oh... this closes the tab. I wonder if that would cause a problem later...
		*/
	
	}catch(ex){
		
		console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'was not able to complete tag checking!!', "GoogleTagsandanalytics_testingErr", currFoldr, scrnsList));
		
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(ex));
	  }
}


//!!! serve the variables over.
//we call the cases. The beauty of this is that they will run asynchronously and I can call as many as I want
	module.exports.QAInvolved = function(val){ QAInvolved = val; }
	module.exports.caseName = function(val){ caseName= val; }
	module.exports.baseUrl = function(val){ baseUrl = val; }
	module.exports.testIn = function(val){ testIn = val; }	
	module.exports.delay = function(val){ delay = val; }
	module.exports.browserSpec = function(val){ browserSpec = val; }	
	module.exports.waitUntil = function(val){ waitUntil = val; }	
	module.exports.steps = function(val){ steps = val; }
	
	module.exports.currFoldr = function(val){ currFoldr = val; }
	
	module.exports.beginTest = beginTest;



