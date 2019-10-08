/*
	NY notes:
		August 1, 2018: (Step 12) and (Utilities steps(9-11))  is vastly different from IL, 
		August 14, 2018: For IE, it doesn't seem to click the "View Details Correctly"
						check this.
		Sept 4, 2018: Added step by step negative check of the required fields. Failure would be if the hook isn't present anymore.
						Function: (path_AcctHolderSINGLE_BOTH(), step12_v2)
						-added screenshot when providing utility (Function:(step11_v1()))
						-increased checkout confirmation timeout to 1 minute
		Sept 5, 2018: 	step7_v1()even on single commodity... IT STILL SAYS BOTH! Wth. Should I confirm with devs before I make changes?				
		Sept 10, 2018: Added "hookLogo" variable for the initial hook, if the logo is now unavailable 
		Dec  31, 2018:- Change test step 1, 2, 6
				  - Go to URL, determine if Single or DUAL product (step 0)
				  - Type in Zip Code (step 1)
				  -  set the hook to "app-commodity-selector" only, click on "all products" (step 2)
				 - added check when clicking on Logo, then clicking on "CANCEL" (step6)
				 - set new logo as the proper hook (step 6)
		Jan 10, 2019:
				- on initialization, added variables for "referredBy" and "referredByValue"
				(path_AcctHolderSINGLE_BOTH) 
				- Added "Relationship to account holder" test steps for "about-you" page 		 
					- if it exists/has value, do the case. Otherwise just skip the case
				- (step 12) get a screenshot on last step
		Feb 05, 2019:
				-modified testInFirefox() function, changed the profile settings
		Mar 18, 2019:
				- Find a way to test the PIXELS/GTM Tags. 
				https://www.simoahava.com/analytics/automated-tests-for-google-tag-managers-datalayer/
				https://www.youtube.com/watch?v=ulUEKEeu41E  (we could add an extension browser with selenium)
				https://stackoverflow.com/questions/34222412/load-chrome-extension-using-selenium
				get back end script with selenium.
				https://stackoverflow.com/questions/20497607/how-to-get-the-contents-of-a-script-tag-in-selenium
				
				very good guide
				https://www.blazemeter.com/blog/6-easy-steps-testing-your-chrome-extension-selenium
				1. download the extension
					- get the url
					- download via https://chrome-extension-downloader.com/
						-Tag assistant https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk
						-Tag manager injector https://chrome.google.com/webstore/detail/tag-manager-injector/ooninanccdmjbcmghimhdfpeklpmlllg?hl=en-GB
						- FB pixel Helper https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc?hl=en-GB
					- save to the same location as the script
				2. Download "Chrome extension source viewer", install it.
					- open each extension page, then view source with this extension.
				3. load the page we are testing (or example, JEOS page: https://justenergyweb-qas-webapp01.azurewebsites.net/)
					-	go to chrome-> Extensions
					-	open the extensions (tag assistant, tag injector, fb pixel helper)
					-	get their IDs
						-tag Assistant ID: chrome://extensions/?id=kejbdjndbnbjgmefkgdddjlbokphdefk
						-Tag injector: chrome://extensions/?id=ooninanccdmjbcmghimhdfpeklpmlllg
						- FB pixl helper: chrome://extensions/?id=fdgfkebogiimcoedlicjlajpkdmockpc
				4.	now, identify the page where the popup shows on the webpage, in the source files... (this would be the hardest part)				
					- for now, 
						-tag Assistant ID: popup2.html
						-Tag injector: popup.html
						- FB pixl helper: fb_notif.html
				5. now, go to the url and load the popup urls by replacing this link: (chrome-extension://UNIQUEID/SPECIFICPAGE.html)
					try opening them and see if the interface shows
					-tag Assistant ID: chrome-extension://kejbdjndbnbjgmefkgdddjlbokphdefk/popup2.html
						-Tag injector: chrome-extension://ooninanccdmjbcmghimhdfpeklpmlllg/popup.html
						- FB pixl helper: chrome-extension://UNIQUEID/fb_notif.html
					
					possible process: all the scripts MUST be recorded in a single tab. But.. how about facebook?
						- inject the tag for QA scripts(google tag injector)
						- start tagAssistantID (google tag assistant)
						- perform the automation!
						- now view the page results, save that to a pdf/html/ anything file. (google tag assistant)
						- turn off google tag injector.
						
					-Modify the testInChrome() function. (this is the only browser that has the pixel checking scripts.)
						-intoduce step 0.1.1, which if chrome, then start the test.
						-read the .crx files downloaded from above using fs in 64 bit
					-for now, remove the other steps in ColdCase();
					-move the driver.close() from AllSteps-> case1() so that the browser testing has been completed. 
					-commented steps in coldcase for now.
					-add the variable : gtmPixelTest
					-IMPORTANT: add the extensions as well on the capabilities
		
		Mar 26,	2019	
					-xp_page_downloader
						- how do I save the whole page?>
					-initialize_tag_testing
					-end_tag_testing
					
					-- to do: try to "saveas" from the page instead... since the thing is hard to save
		Mar 27, 2019
					-made use of website-scraper.. failed, scraping still made website incorrect
					--moved the "mailsender" from AllSteps() to case1()
					
					--fine, since I can't download properly, might as well download the url 
						--what it I download the PDF??
		Mar 28, 2019
					--added the 'replace' module which helps us replace values in a file.
		Apr 02, 2019
					--Drop 4 is ready. Modify the scripts involving product selection
						--define steps that we won't modify.
						
						--CMS  = Step 0,1,6 onwards (step6_v1)
						--CA(ON,AB,MB) = Step 0,1, 6 onwards (step6_v1)
						--CRM(TX,GA,CA) = Step 0, 1,4 onwards (tx_step4_v1) (actually, verify for TX what the changes are)
						--for NY, use 12345
						
					--MODULARIZE ALL FUNCTIONS
						--xp_clicker = xp_clicker
						--xp_selector = cXp_selector
						--xp_cleartxt = cXp_cleartxt
						--xp_textboxes = cXp_textboxes
						--for further dev...
							--xp_picture.
		Apr 03, 2019
					--start dev addProductSingle_v2
					--step 6 removed the proceed func.
					-- FIX ALL LINKS
		Apr 04, 2019
					--done addProductSingle_v2
					--modify step6 path_AcctHolderSINGLE_BOTH refferredByValue hook changed
		Apr 05, 2019
					--begin development of addProductDual_v2
		Apr 08, 2019
					--modified addProductSingle_v2, added a try catch statement to step (P4Single: Actually selecting the product)
					--continued addProductDual_v2
		Apr 09, 2019
					--Added "isRB" that can be YES or NO. by default NO
					--modified allSteps(), added url for promoCode=TEST to COld enrollment.
		Apr 10, 2019
					--make sure isRB is correct. Currently we should only say isRB=YES for ON market
					--finished addProductDual_v2(). Made a complete run along with analytics.
		Apr 11, 2019
					--click on all links for Recommended bundle
					--somehow attach result email to the mailer for Analytics.
					--modify ON and TX.
		Apr 12, 2019
					--Modified addProductDual_v2() and addProductSingle_v2(). If theres only one item in the menu, the selectors are different
		Apr 22, 2019
					--included residentialPlansPage variable 
*/


//for QA to Modify. 
var baseUrl='https://justenergyweb-stg-webapp01.azurewebsites.net/';
var csName = 'NY-COLD-Test-ch'; 
var zipCode = '10001'; 
var securityAns = '1234'; 
var QAInvolved = '';

var browseIn ='chrome'; 
var browserSpec = 0; 
var linkDelay = 18000;

//products (Observation! only App-Product-Summary[] changes depending on the product's number in the list... use that?  										   //*[@id="Body"]/app-root/app-generic-product/section[2]/div/app-product-summary-list/app-product-summary[1]/div/div[4]/button[2]
var ELEProdName = 'NY_secondProduct';
var ELEProductPath = '2';
var fprc = '123456789012345'; 
var GASProdName = 'NY_secondProduct'; 
var GASProductPath = '2';
var gfprc = '123456789012345';


//Utility. Leave UtilityCode as blank if it has default value in the automation
var EleUtil = 'ConEd'; var EleUtilCode ='US.NY.ELE.ConEd'; 
var GasUtil = 'ConEd'; var GasUtilCode ='US.NY.GAS.ConEd';
var planType = 'CA.ON.PABEle';//''; //plan type is n

//Customer information
//setup variables
var aholder_isSame = true; 
var SelectPrefix ='Dr.'; 
var InputFirstName ='Light'; 
var InputMiddleName ='K'; 
var InputLastName ='Yagami'; 
var InputEmail ='msalvador@justenergy.com';
var InputPhone ='416-4164646';
var InputPhoneExt ='0';
var InputAltPhone ='416-4174646';
var InputAltPhoneExt ='0';
var relationshipToAccountHolder = 'Account Holder';



//!!!Do not modify below here please..
//default libs.
const fs = require("fs"); const fsprom = require ("fs").promises; //for files
const path = require('path');
const os = require('os');

//required libraries. 
require("geckodriver");
const webDr = require("selenium-webdriver"); const firefox = require('selenium-webdriver/firefox'); //only for firefox
require('chromedriver');

const dtL = require('node-datetime');
const nodemailer = require('nodemailer');
const {Builder, By, Key, until} = require('selenium-webdriver');


///!!-- Apr 10, 2019 start of the automation modifications for drop 4
//mar 27, 2019 Web0scraper
const scrape = require('website-scraper');

//Mar 28, 2019 
const replacer = require('replace');

//we call our custom libraries
const cshot = require(__dirname + "/../cTakeScreenShot.js");
const cLister = require(__dirname + "/../cAddToList.js"); var scrnsList = []; //this will hold all our screenshots
const cMailer = require(__dirname + "/../cMailer.js");



//setup project variables
var waitUntil = 10000; //ON: 20000, others: 8000  how long until page returns an error for missing elements? in seconds
var driver;  var options;
var element;
var actName ='';
var dt = dtL.create();
dt = dt.format('Y-m-d--H@M@S');
var commodityType ='';
var currFoldr = __dirname + "/../ScrnShots/" + dt + csName;
var pName = ''; //page name
var fname = '';

//Jan 10, 2019: ReferredBy Values
var referredBy =''; var referredByValue = '';

//Mar 25,2019
var gtmPixelTest ='YES'; //NO
var gtmID = 'GTM-PHLNTBH'; //default ID Jalal provided.... maybe provide 

//create location where we will save screenshots
async function fileSet (strFname) {
	fname = currFoldr + strFname;
	console.log(fname + ' is the filename');
	return true;
}

//Apr 2, 2019
//Call our custom events
var cXp_clicker = require(__dirname + "/../cXp_clicker.js"); cXp_clicker.waitUntil=waitUntil; cXp_clicker.browserSpec=browserSpec; 
const xp_clicker = cXp_clicker.xp_clicker;
var cXp_selector = require(__dirname + "/../cXp_selector.js"); cXp_selector.waitUntil=waitUntil; cXp_selector.browserSpec=browserSpec; 
const xp_selector = cXp_selector.xp_selector;

var cXp_cleartxt = require(__dirname + "/../cXp_cleartxt.js"); 
const xp_cleartxt = cXp_cleartxt.xp_cleartxt;

var cXp_textboxes = require(__dirname + "/../cXp_textboxes.js"); cXp_textboxes.waitUntil=waitUntil; cXp_textboxes.browserSpec=browserSpec; 
const xp_textboxes = cXp_textboxes.xp_textboxes;

//Apr 9, 2019 Drop 4 variables
var isRB = "NO"; //isRecommendedBundle?

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
async function case1() {
   
    //await currParameters();
	//await fs.mkdir(currFoldr);  
	 currFoldr = __dirname + "/../ScrnShots/" + dt + csName;
	//create folder
	  fs.mkdir(currFoldr, err => { 
			if (err && err.code != 'EEXIST') throw 'err' //error occured
	   });  
	
	 
	 //Decide which browser we are going to test. 
	   //For some reason... including this in a TRY statement causes an error.
	   //I also can't do an IF statement. hmmm
	 
	  if(browseIn =='chrome') 
	  { await testInChrome(); }
	  else if(browseIn =='firefox') 
	  { await testInFirefox(); }
	  else if(browseIn =='ie') 
	  { await testInIE(); } //hmm... if IE, we have to set the timings to be much much later. 
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
	
	//let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.chrome()).build();
	var chromeCapabs = webDr.Capabilities.chrome();
	//chromeCapabs.Options.Capabilities.addExtensions('Tag-Assistant-(by-Google)_v18.319.0.crx');
	chromeCapabs.set("chromeOptions",  
		{"extensions": [
					fs.readFileSync("./Test_Cases/baseFiles/GTassistant.crx", "base64"),
					fs.readFileSync("./Test_Cases/baseFiles/FBPH_v1.1.6.crx", "base64"),
					fs.readFileSync("./Test_Cases/baseFiles/TMI_v3.1.crx", "base64")
			]}
	);
	let driver = await new webDr.Builder().forBrowser('chrome').withCapabilities(chromeCapabs).build();
	//we might need to make the driver load all of the extensions so...
	await console.log("Preparing chrome Extensions"); await driver.sleep(2500);
	//great, extensions are loaded! now let's try automating them...
	
	
	//first, add in the capabilities the extensions we will use if we are testing google tags 
	if(gtmPixelTest == "YES"){
		await initialize_tag_testing(driver);
	}
		
	
	//start the test.
	await allSteps(driver, 'Chrome');
	
	//now that the test is over, stop the tests now.
	if(gtmPixelTest == "YES"){
		await end_tag_testing(driver);
	}
	
	await console.log("Pixel/GTM testing for chrome accomplished.");
	
	//after the test has been completed, close the driver.
	 driver.close(); 
	 return csName + " completed";
	
	
}
async function testInIE()
{
	let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.ie()).build();
	
	await allSteps(driver, 'IE');
	
	//after the test has been completed, close the driver.
	  driver.close(); 
	 return csName + " completed";
	
}

async function testInFirefox()
{
	//let options = new firefox.Options().setBinary(os.homedir() + '/AppData/Local/Mozilla Firefox/firefox.exe');  
	//these are Firefox settings
	let options = new firefox.Options().setBinary(os.homedir() + 
	 '/AppData/Local/Mozilla Firefox/firefox.exe').setProfile(os.homedir() + 
	 '/AppData/Roaming/Mozilla/Firefox/Profiles/7h7p59zc.Default User');  //99lzhjna.default');  	 
	 
	 let driver = new webDr.Builder()
          .forBrowser('firefox').setFirefoxOptions(options).build();
	 //let driver = await new webDr.Builder().withCapabilities(webDr.Capabilities.firefox()).build();
	 
	 await allSteps(driver, 'Firefox');
	 
	//after the test has been completed, close the driver.
	  driver.close(); 
	 return csName + " completed";
	
	 
}


//(For now, Follows ON. Should I seperate by jurisdiction as well? example IL?) BUT.... the zipcode determines the product...
//all the steps.
var caseType;
async function allSteps(driver, browseIn){
    
	//determine at this point... if it's warm or Cold using the baseUrl variable
	if (baseUrl =='https://justenergyweb-qas-webapp01.azurewebsites.net/' || 
		baseUrl =='https://justenergyweb-qas-webapp01.azurewebsites.net/#/enrollment?promoCode=TEST'){
		//cold case
		console.log("---COLD CASE INITIATED---");
		caseType = 'COLD';
		await coldCase(driver, browseIn);
	}
	else if(baseUrl == 'https://justenergyweb-stg-webapp01.azurewebsites.net/' ||
		baseUrl == 'https://justenergyweb-stg-webapp01.azurewebsites.net/#/enrollment?promoCode=TEST'){
		console.log("---COLD CASE, prod INITIATED---");
		caseType = 'COLD';
		await coldCase(driver, browseIn);
	}
	else //we assume it's a warm case
	{
		console.log("---WARM CASE INITIATED---");
		caseType = 'WARM';
		await warmCase(driver, browseIn);
	}
	 
	
}

//all the steps necessary for cold case.
async function coldCase(driver, browseIn){
	
	
	//[action 0: setup the project. Determine the browser we will be using.]
	 await step0_v1(driver, browseIn);
	 
	 //[action1 load the url, provide zip] 
   await step1_v1(driver, browseIn);
	 

  //[action2 go to pitch page] [refactor this]
   await step2_v1(driver, browseIn);
	 
  //[action3] [refactor this... make smarter if ELE or GAS exists
   //await step3_v1(driver, browseIn);
	 
  
  //[action4 Electricity product, add it to list] 
   //await step4_v1(driver, browseIn);
	 
   //[action5 Gas product, add it to list] 
   //await step5_v1(driver, browseIn);
	 
   //[action6 go to Account holder] 
   await step6_v1(driver, browseIn);
	 
   //[action7 give values to account holder]    
   await step7_v1(driver, browseIn);
	 
  
  //[action8 negative click on checkboxes] 
   await step8_v1(driver, browseIn);
	 
  //REFACTOR! what if we want to use Billing address(es)?
  //[action9 check checkboxes] 
   await step9_v1(driver, browseIn);
	 
  //[action10 Utility_Information_nega_checks] 
   await step10_v1(driver, browseIn);
	 
  
  //[action11 Utility_Information] 
   await step11_v1(driver, browseIn);
	 
  
  //[action12 Final steps..] 
   await step12_v2(driver, browseIn);

   
   
}



//THE ACTUAL STEPS.
//current stop in WARM STEP 4, in a comment

//start of COLD CASE specifics
var logoHook = '//*[@id="Form"]/header/div/nav/div/ul[1]/li[1]/a'; //before: '//*[@id="dnn_dnnHeader_dnnLOGO_imgLogo"]'

//Enrollment hook
//*[@id="Enrollment"]

async function step0_v1(driver, browseIn){
	 //[action 0: setup the project.]
	 try
	 {
	 
		  //LOAD THE BASEURL
		  await driver.get(baseUrl);

		 
		  
		  //identify the type of commodity we're going to do. Is it DUAL, ELE or GAS only?
		 if(GASProductPath !='' && ELEProductPath != '')
			{ commodityType = 'DUAL'; }
			else if (ELEProductPath != '')
			{ commodityType='ELE'; }
			else if (GASProductPath != '')
			{ commodityType ='GAS'; }
		
	 }catch(ex)
	 {
		console.log("The errors might be: <br> Either chrome, firefox, edge or internet explorer might not be available, <br> or the file location where we are saving the file is unavailable to us.  " + ex);
		 return Promise.reject(new Error(ex));
	 } 
}

async function step1_v1(driver, browseIn){
	 //[action1 load the url, provide zip] 
  try{
	 actName = browseIn + '_1_LoadUrl_ProvidePABZip';
	 
	 //clear the textbox first.
	 //ProvideInput 
	await driver.wait(until.elementLocated(By.xpath('//*[@id="PostalCode"]')), 20000, ' err : Postal Code never loaded..');
	element = await driver.findElement(By.xpath('//*[@id="PostalCode"]'));
	 
	 
	 //hook to logo since it's the top : dnn_dnnHeader_dnnLOGO_imgLogo
	 //then type in zipcode to //*[@id="PostalCode"]
	 console.log(await xp_textboxes(
		actName + ': Zip code Typed ' + zipCode,
		logoHook, 
		'//*[@id="PostalCode"]',
		zipCode,
		500, driver, element));
	 
	//we don't click on search for zip code anymore	
	console.log( await xp_clicker(
		actName + ': searched for the zip',
		logoHook, 
		'/html/body/app-root/app-home/div[1]/form/div/div/p/label/button', 
		500, driver, element));
		
	  //if the following is part of url.. will error anyway if google chrome fails
	  console.log(await xp_picture(1000, driver, 'success', 
		'Zip code ' + zipCode + ' provided', actName));
		
  }catch(ex){

	   console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'Typing in zipcode failed.. not at initial products page', actName));
		
	  //mail the error, and exit the test
	  await cMailer.mailIt(csName, scrnsList);
	  return Promise.reject(new Error(ex));
  }
  
}

///!!!//Drop 4 modification
async function step2_v1(driver, browseIn){
	//[action2 go to pitch page] [ELE, GAS or DUAL]
  try{
	actName = browseIn + '_2_ProductSelection'; //there has to be a better way...
	
	await console.log("Remember, we're doing a transaction for: " + commodityType);
	await driver.sleep(2000);
	

	
	//single path
	if(commodityType =='ELE'){
		await addProductSingle_v2(commodityType, actName + '_ELE_'+ ELEProdName, ELEProdName, EleUtil, 
			EleUtilCode, residentialPlansPage,
			ELEProductPath,
			driver, browseIn);
	}else if (commodityType =='GAS'){
		await addProductSingle_v2(commodityType, actName + '_GAS_'+ GASProdName, GASProdName, GasUtil, 
			GasUtilCode, residentialPlansPage,
			GASProductPath,
			driver, browseIn);
	}else if (commodityType =='DUAL'){
		await addProductDual_v2(actName + '_GAS_'+ GASProdName + '_ELE_'+ ELEProdName, 
			ELEProdName, EleUtil, EleUtilCode, ELEProductPath,
			GASProdName, GasUtil, GasUtilCode, GASProductPath,	
			residentialPlansPage,
			driver, browseIn);
	}
	
	

	//dual path.
	
	actName = await browseIn + '_2_ProductSelection';
	
	console.log(await xp_picture(1000, driver, 'success', 
	'Product selection has been completed successfully', actName));	
	
  }catch(ex){
	  
	  console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'Was not able to complete Product selection due to errors.', actName));
	
	  //mail the error, and exit the test
	  await cMailer.mailIt(csName, scrnsList);
	  return Promise.reject(new Error(ex));
  }
  
}

async function addProductSingle_v2(cmdtyType, actNameFr, prodcName, 
	utilName, utilCode, urlResidentialPlans,
	prodPath, driver, browseIn)
{
	 try{
	var actName = actNameFr; 
	
	//single.
	//smartly determine if GAS or ELE

	//first, start with For-Homes page
	//determine if menu exists (try )
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-commodity-selector-tab/section/div/div/div/a[1]
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-commodity-selector-tab/section/div/div/div/a[2]
	
	//then, select the product :)
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[1]/div/div[6]/button
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[3]/div/div[6]/button


	//then, reload the page and try with a residential page try.. we will probably always have to modify the url
	//load  https://justenergyweb-qas-webapp01.azurewebsites.net/residential-plans/#/enrollment/US/NY/SVC/residential-plans
			//from baseurl... or  https://justenergyweb-qas-webapp01.azurewebsites.net/for-homes/#/enrollment/US/NY/SVC
	//then do Residential try
	//if ele gas link exists (do a try):
	//gas: 
		//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-commodity-selector-tab/section/div/div/div/a[2]
	//ele
		//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-commodity-selector-tab/section/div/div/div/a[1]
		
	//if not exists, just click on the link
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-rows/app-product-row/div/div[3]/button[2]
	
	//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-product-row[2]/div/div[3]/button[2]
	//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[2]/div/div[6]/button


	//PASingle: Clicking on the commodity menu, if available
	
	
	var typeSelector; 
	if(cmdtyType=='ELE'){ typeSelector = 1; } if(cmdtyType=='GAS'){ typeSelector = 2; }
	
	//we only use try catch so the test proceeds.
	try{
		console.log(await xp_clicker( 
			actName + 'PASingle: Clicking on the commodity menu, if available',
			'//*[@id="postalCode"]', 
			'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-commodity-selector-tab/section/div/div/div/a[' + typeSelector + ']', 			
			2000, driver, element));
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PASingle: Commodity has been selected (it was available) ', actName + '_comdtySelectedA'));	
	}catch(exA)
	{ console.log("No need for PASingle: " + exA); }
	await driver.sleep(1000);
	
	//PBSingle: Utility Provider
	try{
		console.log("selecting utility name now:" + utilName);
		
		
		try{
			console.log(await xp_selector(
				actName + ': Utility Provider, part B',
				'//*[@id="postalCode"]', 
				'//*[@id="utilitySelector"]', 
				"//*[@id='utilitySelector']/option[text()[contains(., '" + utilName + "')]]", 
				1500, driver, element));
		}catch (exPBSingle){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPBSingle, 
			'PBSingle could not select ' + utilName + '. Either the name provided is not correct, or the interface is not available anyway. Right now will use default selected ', 
				actName));
			//mail the error, and exit the test
			//await cMailer.mailIt(csName, scrnsList);
			//return Promise.reject(new Error(exPBSingle));
		}
		
		
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PBSingle: Utility Selected (it was available) ', actName + '_utltySelectedB'));
		
		//now actually click on next
		console.log(await xp_clicker( 
			actName + 'PBSingle: show products',
			'//*[@id="postalCode"]', 
			'//*[@id="utility-selector-next-button"]', 			
			2000, driver, element));
	}catch (exB)
	{ console.log("No need for PBSingle : " + exB); }
	await driver.sleep(1000);
	
	
	//assert the products are now visible
	console.log(await xp_picture(1500, driver, 'success', 
	'Products are now visible. Selecting '+ 
	prodcName + ', ' + utilName + ', ' + utilCode + ' now ', actName + '_A'));
	
	//PCSingle: Actually selecting the product
	//start with "View Details". Remember to use the product path selected by the user.	
	try{
		console.log(await xp_clicker( 
			actName + 'PCSingle: ViewDetails',
			'//*[@id="postalCode"]', 
			'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[' + prodPath + ']/div/div[6]/button', 					
			2000, driver, element));
		
	}catch(exI){
		try{
			//pattern 2
			console.log(await xp_clicker( 
				actName + 'PCSingle: ViewDetails',
				'//*[@id="postalCode"]', 	
				'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[1]/div/div[' + prodPath + ']/div/div/div[6]/button',
				2000, driver, element));
		}
		catch (eII){
			//Apr 12, 2019
			//there's only 1 product in the item cart
			console.log(await xp_clicker( 
				actName + 'PCSingle: ViewDetails',
				'//*[@id="postalCode"]', 
				'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-rows/app-product-row/div/div[4]/button[2]', 					
				2000, driver, element));	
		}
	}
	
	
	
	
	
	//Iterate. Use the existing click all links.	
	await click_allLinks(actName + '_A_', driver, element);
	
	console.log(await xp_picture(1500, driver, 'success', 
		'PCSingle: all links selected ', actName + '_pdfsClickedC'));
	//now, click on sign up.
	console.log(await xp_clicker( 
			actName + 'PCSingle: Go to account holder.',
			'//*[@id="Body"]/modal-container/div/div/div[3]/button', 
			'//*[@id="Body"]/modal-container/div/div/div[3]/button', 			
			2000, driver, element));
			
	//assert that we are in Account holder.
	await driver.wait(until.urlContains('/enroll/'), 20000, 
		'Err : not in account holder!');
		
	///---------------------------------------------
	///---------------------------------------------
	///!!! PART 2
	//now navigate back to residential-plans page [should we set this as a parameter?]
	await driver.get(urlResidentialPlans); 
	await driver.sleep(1000);
	
	//P1Single: Clicking on the commodity Selector, ResPlans
	//use the typeselector, determined above.
	try{
		console.log(await xp_clicker( 
			actName + 'P1Single Clicking on the commodity Selector ResPlans',
			'//*[@id="postalCode"]', 
			'//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-commodity-selector-tab/section/div/div/div/a[' + typeSelector + ']', 			
			2000, driver, element));
			
		console.log(await xp_picture(1500, driver, 'success', 
		'P1Single: Commodity has been selected (it was available) ', actName + '_comdtySelected1'));	
		
	}catch(ex2)
	{ console.log("No need for P1Single : " + ex2); }
	
	await driver.sleep(1000);
	
	//P2Single: Utility Provider Selector
	try{
		//hmm, ok let's actively select the menu
		//*[@id="a-utilitydisplay-' + cmdtyType + '"]
		try{
			console.log(await xp_clicker( 
			actName + 'P2Single try showing the menu',
			'//*[@id="postalCode"]', 
			'//*[@id="a-utilitydisplay-' + cmdtyType + '"]', 			
			2000, driver, element));
		}catch (ex3a){
			console.log("P2Single: we dont need to click the menu "); }
		
		console.log("selecting utility name now:" + utilName);
		
		try{
			console.log(await xp_selector(
				actName + ': P2Single:  Utility Provider, part 2',
				'//*[@id="postalCode"]', 
				'//*[@id="utilitySelector"]', 
				"//*[@id='utilitySelector']/option[text()[contains(., '" + utilName + "')]]", 
				1500, driver, element));
		}catch (exP2Single){
			console.log(await xp_picture(1000, driver, 'ERROR' + exP2Single, 
			'P2Single could not select ' + utilName + '. Either the name provided is not correct, or the interface is not available anyway. Right now will use default selected. ', 
				actName));
			//mail the error, and exit the test
			//await cMailer.mailIt(csName, scrnsList);
			//return Promise.reject(new Error(exP2Single));
		}
		
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PBSingle: Utility Selected (it was available) ', actName + '_utltySelectedB'));
		
		//now actually click on next
		console.log(await xp_clicker( 
			actName + 'P2Single: show products',
			'//*[@id="postalCode"]', 
			'//*[@id="utility-selector-next-button"]', 			
			2000, driver, element));
		
		
	}
	catch (ex3) { console.log("Perhaps Utility is not required. Proceeding to selecting the product "); }
	
	
	//P3Single: Actually selecting the product
	//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-product-row[1]/div/div[3]/button[2]
	
	//assert the products are now visible
	console.log(await xp_picture(1500, driver, 'success', 
	'P3Single : Products are now visible. Selecting '+ 
	prodcName + ', ' + utilName + ', ' + utilCode + ' now ', actName + '_3'));
	
	
	//P4Single: Actually selecting the product
	//start with "View Details". Remember to use the product path selected by the user.	
	//applied a try-catch statement
	try{
		//apr 12, 2019. menu has been changed.
		console.log(await xp_clicker( 
			actName + 'P3Single: ViewDetails',
			'//*[@id="postalCode"]', //'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[' + prodPath + ']/div/div[6]/button',
			//'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[' + prodPath + ']/div/div[3]/button[2]',	
			'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[' + prodPath + ']/div/div[4]/button[2]',
			2000, driver, element));
	}catch(vv){
		//if this is the only product...
		console.log(await xp_clicker( 
			actName + 'P3Single: ViewDetails',
			'//*[@id="postalCode"]',
			//'//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-product-row[' + prodPath + ']/div/div[3]/button[2]',
			'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row/div/div[4]/button[2]',
			2000, driver, element));
	}
	
	//if this is the only product...
	//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row/div/div[4]/button[2]	
	//else if there are multiple products
	//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[1]/div/div[4]/button[2]
	//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[2]/div/div[4]/button[2]
	
	
	//Iterate. Use the existing click all links.	
	await click_allLinks(actName + '_3_', driver, element);
	
	console.log(await xp_picture(1500, driver, 'success', 
		'PCSingle: all links selected ', actName + '_pdfsClicked3'));
	//now, click on sign up.
	console.log(await xp_clicker( 
			actName + 'PCSingle: Go to account holder.',
			'//*[@id="Body"]/modal-container/div/div/div[3]/button', 
			'//*[@id="Body"]/modal-container/div/div/div[3]/button', 			
			2000, driver, element));
	
	//we can now proceed to account holder!
	
		
	
  }catch(ex){
	  
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'could not select ' + prodcName + '. Maybe its location has been changed? ? is it an active product?', 
		actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
}

async function addProductDual_v2(actNameFr, 
	prodcEName, utilEName, utilECode, prodEPath,
	prodcGName, utilGName, utilGCode, prodGPath,	
	urlResidentialPlans,
	driver, browseIn){
	 try{
	
	var actName = actNameFr; 
	
	//start with regular page
	//for dual, consider ON suggested bundles. (M2M1V8)
	//without suggested (L5T1G9)
	
	//PartA0: start by selecting the "Electricity & Natural Gas" menu
		//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-commodity-selector-tab/section/div/div/div/a[3]	
	
	//PartA1: selecting the Utilities.
	//there could be an ELE Utility first.. (using text)
		
		//*[@id='utility-selector-label'][text()[contains(., 'electric')]]
		//*[@id='utility-selector-label'][text()[contains(., 'Please select your local natural gas utility company')]]
		
	//then.. GAS
		
		
	
	//proceed to Residential plans
		//*[@id="btn-createbundle"]
	//perform utility selectors again... then try to select the product below.
	
	//CHECK: isBundle=YES?
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[1]/div/div[2]/button[2]
	//if isBundle=NO: 
	//check if isBundle tag present. 
	//if YES modify app-product-row for ELE + 1. If NOT present, just ELE. 
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[2]/div/div[3]/button[2]
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[3]/div/div[3]/button[2]
	
	//for GAS, app-product-row + 1
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[2]/div/div[3]/button[2]
	
	
	
	//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[1]/div/div[3]/button[2]
	//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[2]/div/div[3]/button[2]
	
	//uh oh... it could be:
	//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[2]/div[2]/div[7]/button
	//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[3]/div[2]/div[7]/button
	//or
	//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[1]/div/div[7]/button
	//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[4]/div/div[7]/button
	
	
	///!!!-------------------
		
		
	//PartA0: start by selecting the "Electricity & Natural Gas" menu
	try{
		console.log(await xp_clicker( 
			actName + 'PASingle: Clicking on the commodity menu, if available',
			'//*[@id="postalCode"]', 
			'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-commodity-selector-tab/section/div/div/div/a[3]', 			
			2000, driver, element));
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PartA0: start by selecting the "Electricity & Natural Gas" menu', actName + '_MenuSlectedA'));	
	}catch(exPartA0)
	{ 
		//DUAL is not setup!
		console.log(await xp_picture(1000, driver, 'ERROR' + exPartA0, 
		'the DUAL menu is not available. Please double check products setup for this test.', 
			actName));
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(exPartA0));
	}
	
	await driver.sleep(1000);	
	
	
	//PartA1: selecting the Utilities. ELE
	try{
		await driver.wait(until.elementLocated(By.xpath("//*[@id='utility-selector-label'][text()[contains(., 'Please select your local electric utility company')]]")), 
			5000, 'Err : ELEUtilitySelector not available');
			
		console.log(" selecting utility name now, for ELE " + utilEName);
		
		
		try{
			console.log(await xp_selector(
				actName + ': Utility Provider Dual, ELE first ',
				'//*[@id="postalCode"]', 
				'//*[@id="utilitySelector"]', 
				"//*[@id='utilitySelector']/option[text()[contains(., '" + utilEName + "')]]", 
				1500, driver, element));
		}catch (exPartA1Innr){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPartA1Innr, 
			'PartA1 could not select ' + utilEName + '. Util name could not be found. Please double check. Will use the default for now. ', 
				actName));
			//mail the error, and exit the test
			//await cMailer.mailIt(csName, scrnsList);
			//return Promise.reject(new Error(exPartA1Innr));
		}
		
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PartA1: selecting the Utilities. ELE (it was available)', actName + '_PartA1'));
		
		//now actually click on next
		console.log(await xp_clicker( 
			actName + 'PartA1: selecting the Utilities. ELE',
			'//*[@id="postalCode"]', 
			'//*[@id="utility-selector-next-button"]', 			
			2000, driver, element));
	}catch (exPartA1)
	{ console.log("ELE Utility is now ready. : " + exPartA1); }
	await driver.sleep(1000);	
		
		
	//PartA2: selecting the Utilities. GAS
	try{
		await driver.wait(until.elementLocated(By.xpath("//*[@id='utility-selector-label'][text()[contains(., 'Please select your local natural gas utility company')]]")), 
			5000, 'Err : GASUtilitySelector not available');
			
		console.log(" selecting utility name now, for GAS " + utilGName);
		
		
		try{
			console.log(await xp_selector(
				actName + ': Utility Provider Dual, GAS ',
				'//*[@id="postalCode"]', 
				'//*[@id="utilitySelector"]', 
				"//*[@id='utilitySelector']/option[text()[contains(., '" + utilGName + "')]]", 
				1500, driver, element));
		}catch (exPartA2Innr){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPartA2Innr, 
			'PartA2 could not select ' + utilGName + '. Util name could not be found. Please double check. Will use the default for now. ', 
				actName));
			//mail the error, and exit the test
			//await cMailer.mailIt(csName, scrnsList);
			//return Promise.reject(new Error(exPartA2Innr));
		}
		
		
		console.log(await xp_picture(1500, driver, 'success', 
		'PartA2: selecting the Utilities. GAS (it was available)', actName + '_PartA2'));
		
		//now actually click on next
		console.log(await xp_clicker( 
			actName + 'PartA2: selecting the Utilities. GAS',
			'//*[@id="postalCode"]', 
			'//*[@id="utility-selector-next-button"]', 			
			2000, driver, element));
	}catch (exPartA2)
	{ console.log("GAS Utility is now ready. : " + exPartA2); }
	await driver.sleep(1000);

	
	//at this point, we click on the Residential-Plans
		console.log(await xp_clicker( 
			actName + 'Residential-Plans',
			'//*[@id="postalCode"]', 
			'//*[@id="btn-createbundle"]', 			
			2000, driver, element));

	//PartA3 ELE and PartA4 GAS  select utilities again. 
	await d4_utility_selector("PartA3", "Please select your local electric utility company", "ELE", actName + 'PartA3: selecting the Utilities (res page). ELE', 
	utilEName, utilECode, driver, browseIn);
	
	await d4_utility_selector("PartA4", "Please select your local natural gas utility company", "GAS", actName + 'PartA4: selecting the Utilities (res page). GAS', 
		utilGName, utilGCode, driver, browseIn);
	
	
	//PartB1 ResPlans 
	if(isRB=='YES'){
		await console.log(" -- !!! Recommended Bundle path selected. We will perform that.");
		//PartB1A, Recommended Bundle Path
		//it's always going to be app-product-row[1]
		try{
			console.log(await xp_clicker( 
				actName + 'PartB1A Recommended Bundle Path',
				'//*[@id="postalCode"]',
				//'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[1]/div/div[2]/button[2]',
				'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[1]/app-product-row/div/div[2]/button[2]',
				2000, driver, element));
		}catch (exPartB1A){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPartB1A, 
			'Recommended Bundle is not Present! ', 
				actName));
			
			//mail the error, and exit the test
			await cMailer.mailIt(csName, scrnsList);
			return Promise.reject(new Error(exPartB1A)); 
		}
		
		//PartB1B, selecting all contract links.
		
		
		//end of the DUAL product selection
		console.log(await xp_picture(1500, driver, 'success', 
			prodcEName + ', ' + utilEName + ', ' + utilECode + ' ' + 
			prodcGName + ', ' + utilGName + ', ' + utilGCode + ' is selected ', actName));
		
		
		//now, click on sign up
			console.log(await xp_clicker( 
				actName + 'PartC1AEle Signing up',
				'//*[@id="postalCode"]',
				'//*[@id="Body"]/modal-container/div/div/div[3]/button',
				2000, driver, element));
		
	}else{
		
		await console.log(" -- !!! We will follow a regular dual transaction path.");
		//PartC1A Regular Dual Transaction Path
		//assert the products are now visible
		console.log(await xp_picture(1500, driver, 'success', 
		'PartC1A : Products are now visible. Now following a regular dual transaction'));
		
		//PartC1AEle
		//applied a try-catch statement
		///!!! -- if the Recommended bundle is present... you must add 1 to app-product-row
		/* var eleSelectr = parseInt(prodEPath);
		try{ 
				await driver.wait(until.elementLocated(By.xpath('//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[1]/div/div[2]/button[2]')), 
					2000, ' Err: the dual does not exists.'); 
					
				eleSelectr = await eleSelectr + 1;
				}
		catch(evv){ }*/
		
		//if suggested bundle is present
		//ELE MENUS
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[1]/div/div[4]/button[2]
	
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[2]/div/div[4]/button[2]
		//gas menus
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[1]/div/div[4]/button[2]
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[2]/div/div[4]/button[2]
		
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row/div/div[4]/button[2]
		
		
		//if not...
		//ELE
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[1]/div/div[4]/button[2]
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[3]/div/div[4]/button[2]
		//GAS
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[1]/div/div[4]/button[2]
		//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[2]/div/div[4]/button[2]
		
		//now, select ELE
		var eleSelectr = parseInt(prodEPath);
		try{
			/*try{
				console.log(await xp_clicker( 
					actName + 'PartC1AEle ViewDetails',
					'//*[@id="postalCode"]', //'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[' + prodPath + ']/div/div[6]/button',
					'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[' + 
					eleSelectr + ']/div/div[3]/button[2]',
					2000, driver, element));
			}catch(vv){
				console.log(await xp_clicker( 
					actName + 'PartC1AEle ViewDetails',
					'//*[@id="postalCode"]',
					'//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-product-row[' + 
					eleSelectr + ']/div/div[3]/button[2]',
					2000, driver, element));
			}*/
			try{
				//try, without RB
				console.log(await xp_clicker( 
					actName + 'PartC1AEle ViewDetails',
					'//*[@id="postalCode"]', 
					'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row[' + eleSelectr + ']/div/div[4]/button[2]',
					2000, driver, element));
			}catch(vv){
				//perhaps RB exists
				
				try{
					console.log("seems RB exists,");
					console.log(await xp_clicker( 
						actName + 'PartC1AEle ViewDetails',
						'//*[@id="postalCode"]', 
						'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[' + eleSelectr + ']/div/div[4]/button[2]',
						 //*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[' + eleSelectr + ']/div/div[4]/button[2]
						2000, driver, element));
				}
				catch(vv2){
					//perhaps, RB does not exist AND it's the only menu item.
					console.log("!!!-- Perhaps it's the only item");
					console.log(await xp_clicker( 
						actName + 'PartC1AEle ViewDetails',
						'//*[@id="postalCode"]', 
						'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[4]/app-product-row/div/div[4]/button[2]',
						2000, driver, element));
				}
				
				
			}
			
			//Iterate. Use the existing click all links.	
			await click_allLinks(actName + '_PartC1AEle_', driver, element);
			
			console.log(await xp_picture(1500, driver, 'success', 
				'PartC1AEle : all links selected ', actName + '_PartC1AEle_good'));
				
				
				
			//now, click on sign up
			console.log(await xp_clicker( 
				actName + 'PartC1AEle Signing up',
				'//*[@id="postalCode"]',
				'//*[@id="Body"]/modal-container/div/div/div[3]/button',
				2000, driver, element));
				
		}catch (exPartC1AEle){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPartC1AEle, 
			'Error on selecting ELE product on Res Plans!', 
				actName));
			
			//mail the error, and exit the test
			await cMailer.mailIt(csName, scrnsList);
			return Promise.reject(new Error(exPartC1AEle)); 
		}
		
		//PartC2Gas
		var gasSelectr = parseInt(prodGPath) + 1;
		try{
			
			/*try{
			console.log(await xp_clicker( 
				actName + 'PartC2Gas ViewDetails',
				'//*[@id="postalCode"]', //'//*[@id="Body"]/app-root/app-product-selection/section[2]/app-has-products/app-has-products-single-commodity/div/app-product-cards/div/div[' + prodPath + ']/div/div[6]/button',
				'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row[' + gasSelectr + ']/div/div[3]/button[2]',
				2000, driver, element));
			}catch(vv){
				
				
				console.log(await xp_clicker( 
					actName + 'PartC2Gas ViewDetails',
					'//*[@id="postalCode"]',
					'//*[@id="Body"]/app-root/app-residential-plans/div[2]/app-product-row[' + gasSelectr + ']/div/div[3]/button[2]',
					2000, driver, element));
			}*/
			console.log(await xp_clicker( 
					actName + 'PartC2Gas ViewDetails',
					'//*[@id="postalCode"]', 
					'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/div[5]/app-product-row[' + prodGPath + ']/div/div[4]/button[2]',
					2000, driver, element));
		
			
			
			//Iterate. Use the existing click all links.	
			await click_allLinks(actName + '_PartC2Gas_', driver, element);
			
			console.log(await xp_picture(1500, driver, 'success', 
				'PartC2Gas : all links selected ', actName + '_PartC2Gas_good'));
			
			//click on signup
			console.log(await xp_clicker( 
				actName + ' all signed up',
				'//*[@id="postalCode"]',
				'//*[@id="Body"]/modal-container/div/div/div[3]/button',
				2000, driver, element));
			
		}catch (exPartC2Gas){
			console.log(await xp_picture(1000, driver, 'ERROR' + exPartC2Gas, 
			'Error on selecting GAS product on Res Plans!', 
				actName));
			
			//mail the error, and exit the test
			await cMailer.mailIt(csName, scrnsList);
			return Promise.reject(new Error(exPartC2Gas)); 
		}
		
		//end of the DUAL product selection
		console.log(await xp_picture(1500, driver, 'success', 
			prodcEName + ', ' + utilEName + ', ' + utilECode + ' ' + 
			prodcGName + ', ' + utilGName + ', ' + utilGCode + ' is selected ', actName));
		
		
		//finally, we click on Sign UP.
		console.log(await xp_clicker( 
					actName + ' all signed up',
					'//*[@id="postalCode"]',
					'//*[@id="Body"]/app-root/app-residential-plans/div/div[2]/app-product-row/div[2]/button[2]',
					2000, driver, element));
					
		
	}
	
	
	
				
		
		
  }catch(ex){
	  
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'could not select the products for dual.', 
		actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
}


async function d4_utility_selector(title, contains, comdity, actName, 
	utilName, utilCode, driver, browseIn){
	
	try{
		await driver.wait(until.elementLocated(By.xpath("//*[@id='utility-selector-label'][text()[contains(., '" + contains + "')]]")), 
			5000, 'Err : ' + comdity + 'UtilitySelector not available');
			
		console.log(" selecting utility name now, for " + comdity + " " + utilName);
		
		
		try{
			console.log(await xp_selector(
				actName + ': Utility Provider , ' + comdity,
				'//*[@id="postalCode"]', 
				'//*[@id="utilitySelector"]', 
				"//*[@id='utilitySelector']/option[text()[contains(., '" + utilCode + "')]]", 
				1500, driver, element));
		}catch (exIn){
			console.log(await xp_picture(1000, driver, 'ERROR' + exIn, 
			title + ' could not select ' + utilCode + 
				'. Util name could not be found. Please double check. Will use the default for now. ', 
				actName));
			//mail the error, and exit the test
			//await cMailer.mailIt(csName, scrnsList);
			//return Promise.reject(new Error(exPartA2Innr));
		}
		console.log(await xp_picture(1500, driver, 'success', 
		title + ': selecting the Utilities. ' + comdity + ' (it was available)', 
			actName + '_PartA2'));
		
		//now actually click on next
		console.log(await xp_clicker( 
			actName,
			'//*[@id="postalCode"]', 
			'//*[@id="utility-selector-next-button"]', 			
			2000, driver, element));
	}catch (ex)
	{ console.log(title + ' ' + comdity + " Utility is now ready. : " + ex); }
	await driver.sleep(1000);
	
}

///!!!//Apr 10, 2019 EOF 1

//old stat functions
async function step3_v1(driver, browseIn){
	//[action3] [refactor this... make smarter if ELE or GAS exists
  try{
	actName = browseIn + '_3_provide_Parameters';  driver.sleep(1000);
	
	//let's wait until the page is ready to interact with us (Select Electric Utility to view plans)
	//await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/app-generic-product/section[1]/div/div/div[2]/div/div/div/span')), 20000, ' ERR: Pitch page was never ready '); 
	
	//let's use multiple ifs to determine what the automation will do...
	if (commodityType == 'DUAL')
	{
		//by default.. energy type would say 'Electric and natural Gas'
		try{
			if(EleUtilCode != ''){
				console.log(await xp_selector(
				actName + ': Provide Electricity utility : ' + EleUtil,
				logoHook, //hook to the logo
				"//select[@id='SelectEU'][1]",  //*[@id="SelectEU"] //*[@id="SelectEU"]
				"//option[@value='" + EleUtilCode + "']", 
				2000, driver, element));
				}
		} catch(ex){
			console.log("ELE utility is locked...hopefully the tests continue..");
		}
		
		try{
			if(GasUtilCode != ''){
				
				console.log(await xp_selector(
				actName + ': Provide Gas utility : ' + GasUtil,
				logoHook,
				"(//select[@id='SelectEU'])[2]",  
				"(//select[@id='SelectEU'])[2]/option[@value='" + GasUtilCode + "']",//"(//select[@id='SelectEU'])[2]/option[2]", 
				2000, driver, element));
			}
			
		}catch(ex){
			console.log("GAS utility is locked...hopefully the tests continue.." + ex);
		}
		
		
		await driver.wait(until.elementLocated(
		By.xpath('/html/body/app-root/app-generic-product/section[2]/div/app-bundle-builder/div/div[1]')
		), 20000, ' err: Plan type never appeared..');
		
	}
	else if(commodityType == 'ELE')
	{
		//modify Energy type... select Ele only
		console.log(await xp_selector(
			actName + ': selected ELE energy type only ',
			logoHook,
			"//select[@id='SelectEType']",  //*[@id="SelectEU"] //*[@id="SelectEU"]
			"//option[@value='ELE']", //"//*[@id='SelectEType']/option[3]", 
			1000, driver, element));
		
		try{
			if(EleUtilCode != ''){
				console.log(await xp_selector(
				actName + ': Provide Electricity utility : ' + EleUtil,
				logoHook,
				"//select[@id='SelectEU']",  
				"//option[@value='" + EleUtilCode + "']", 
				2000, driver, element));
			}
		} catch(ex){
			console.log("ELE utility is locked...hopefully the tests continue..");
		}
		
	}	
	else if(commodityType == 'GAS')
	{
		//modify Gas type... select Gas only
		console.log(await xp_selector(
			actName + ': selected GAS energy type only ',
			logoHook, 
			"//select[@id='SelectEType']",
			"//option[@value='GAS']", 
			1000, driver, element));
		try{
			if(GasUtilCode != ''){
				console.log(await xp_selector(
					actName + ': Provide Electricity utility : ' + EleUtil,
					logoHook,
					"//select[@id='SelectEU']",  //*[@id="SelectEU"] //*[@id="SelectEU"]
					"//option[@value='" + GasUtilCode + "']", 
				2000, driver, element));
			}
		}catch(ex){
			console.log("GAS utility is locked...hopefully the tests continue..");
		}
	}
	
	
	//!! note: it is possible for ENERGY BUNDLE OPTIONS and CREATE YOUR OWN BUNDLE to suddenly pop up
	//let's use a control structure for that
	//if did not work exactly as planned. Let's use try and catch
	try{
		await driver.wait(until.elementLocated(By.xpath('//*[@id="Body"]/app-root/app-generic-product/section[2]/div/app-bundle-switch/nav/a[2]')) ,1000);
		element = await driver.findElement(By.xpath('//*[@id="Body"]/app-root/app-generic-product/section[2]/div/app-bundle-switch/nav/a[2]'), 1000);
		console.log("CREATE YOUR OWN BUNDLE EXISTS!");
		
		//perform CYOB
		console.log(await xp_clicker(
		actName + ': set the ENERGY BUNDLE OPTIONS',
		logoHook, 
		'//*[@id="Body"]/app-root/app-generic-product/section[2]/div/app-bundle-switch/nav/a[2]', 
		2000, driver, element));
		
	}
	catch(ex){
		console.log("CREATE YOUR OWN BUNDLE.. does not exist. Hopefully the tests continue");
	}
	
	
	try{
		if(planType != ''){
			console.log(await xp_selector(
			actName + ': Provide Plan type',
			logoHook,
			"//select[@id='SelectPType']", 
			"//option[@value='" + planType + "']", 
			3000, driver, element));
		}else{
			console.log("no Plan Type provided. Continuing");
		}
	}
	catch(ex)
	{
		console.log("SelectPType is locked.. Hopefully the tests continue" + '     ' + ex);
	}
	
	//do not proceed until products are not ready.
	console.log(await xp_picture(1000, driver, 'success', 
	EleUtil + ' was selected, ' + GasUtil + ' was selected, ' + planType + ' was selected', actName));
	
  }catch(ex){
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'could not select the values (' + EleUtil + ', ' + GasUtil + ', ' + planType + '). Maybe their values have been changed? (ID, value)' + ex, actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}

//old ELE function
async function step4_v1(driver, browseIn){
	//[action4 Electricity product, add it to list] 
	
  try{
	actName = browseIn + '_4_' + ELEProdName; 
	
	//console.log('stopping test at this point'); return ''; //driver.close(); 
	
	if(ELEProductPath != '') //ELE was selected by the user... let's add it.
	{ 
		/*Util is commented for now
		//select utility if necesary. does not have to worry on placement anyway.
		try{
			if(EleUtilCode != ''){
				console.log(await xp_selector(
				actName + ': Provide Electricity utility : ' + EleUtil,
				logoHook,
				"//select[@id='SelectEU'][1]",  //*[@id="SelectEU"] //*[@id="SelectEU"]
				"//option[@value='" + EleUtilCode + "']", 
				1000, driver, element));
			}
		} catch(ex){
			console.log("ELE utility is locked...hopefully the tests continue..");
		}
		*/
		
		//utility for ELE was done in step 3... supposedly.
		
		console.log(await xp_clicker( 
		actName + ': click on the ' + ELEProdName,
		'/html/body/app-root/app-generic-product/section[2]/div/app-product-summary-list/app-product-summary[' + ELEProductPath + ']/div/div[4]/button[2]', 
		'/html/body/app-root/app-generic-product/section[2]/div/app-product-summary-list/app-product-summary[' + ELEProductPath + ']/div/div[4]/button[2]', 
		1000, driver, element));
	
		
		await driver.wait(until.elementLocated(By.className('modal-body'))); 
		
		
		console.log(await xp_picture(1500, driver, 'success', 
		ELEProdName + ', is selected ', actName));
		
		
		//at this point.... capture all pictures in the sidebar
			//iterate thru it.
			await click_allLinks(actName, driver, element);
			
			
		//now.. add the product itself to the cart
		//why... why doesn't it click?
		console.log(await xp_clicker(
			actName + ': add the ' + ELEProdName + ' as an order',
			'/html/body/modal-container/div/div/div[3]/button', 
			'/html/body/modal-container/div/div/div[3]/button', 
			2000, driver, element));
			
			
			
	}else{
	//take picture now
	console.log(await xp_picture(1000, driver, 'success', 
		'Skipping the ELE product. No Product was set up ', actName));
	}
	
	
  }catch(ex){
	  
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'could not select ' + ELEProdName + '. Maybe its location has been changed? ? is it an active product?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }

}

async function step5_v1(driver, browseIn){
	 //[action5 Gas product, add it to list] 
  try{
	actName = browseIn + '_5_' + GASProdName; 
	
	if(GASProductPath!='') //gas exists... let us select the gas product
	{
		/* commented, as IL bugs out with this in Firefox
		//provide correct utility code first...
		if(GasUtilCode != ''){
			if(ELEProductPath != '')
			{ //place the gas utility on the SECOND 'SelecuEU' select.
				try{
					console.log('---second GAS DETECTED----');
					console.log(await xp_selector(
							actName + ': Provide Gas utility : ' + GasUtil,
							'//*[@id="dnn-banner"]/div/div',//logoHook,
							"(//select[@id='SelectEU'])[2]",  
							"(//select[@id='SelectEU'])[2]/option[@value='" + GasUtilCode + "']",//"(//select[@id='SelectEU'])[2]/option[2]", 
							1000, driver, element));
				} 
				catch(ex){
					console.log("GAS utility is locked...hopefully the tests continue.. error on the gas selector" + ex);
				}
			}
			else //place the gas utility on the FIRST 'SelecuEU' select.
			{
				try{
						console.log('---FIRST GAS DETECTED----');
						
						console.log(await xp_selector(
						actName + ': Provide Gas utility : ' + GasUtil,
						'//*[@id="dnn-banner"]/div/div',
						"//select[@id='SelectEU']",  
						"//option[@value='" + GasUtilCode + "']", //"//select[@id='SelectEU']/option[2]", 
						1000, driver, element));
				
				} 
				catch(ex){
					console.log("GAS utility is locked...hopefully the tests continue.. error on the gas selector" + ex);
				}
			}
			
		}
		*/
		
		
		if (commodityType == 'DUAL'){
		console.log(await xp_clicker(
			actName + 'click on "NaturalGas" Menu.. hook to top, then click on actual element',
			'/html/body/app-root/app-generic-product/div/div/div/app-zip-input/form/label/button', 
			'/html/body/app-root/app-generic-product/section[2]/div/app-gas-ele-switch/nav/a[2]', 
			6000, driver, element));
		}
		
	
		console.log(await xp_clicker(
			actName + ': click on ' + GASProdName,
			'/html/body/app-root/app-generic-product/section[2]/div/app-product-summary-list/app-product-summary[' + GASProductPath + ']/div/div[4]/button[2]', 
			'/html/body/app-root/app-generic-product/section[2]/div/app-product-summary-list/app-product-summary[' + GASProductPath + ']/div/div[4]/button[2]', 
			1000, driver, element));
		
		//wait a little until the modal exists
		await driver.wait(until.elementLocated(By.className('modal-body'))); 
		
		//take picture now
		console.log(await xp_picture(1500, driver, 'success', 
		GASProdName + ', added to list', actName));
		
		
		//at this point.... capture all pictures in the sidebar
			//iterate thru it.
			await click_allLinks(actName, driver, element);
		
		//now, add the gas product to the cart.
		console.log(await xp_clicker(
			actName + ': add the ' + GASProdName + ' as an order',
			'/html/body/modal-container/div/div/div[3]/button', 
			'/html/body/modal-container/div/div/div[3]/button', 
			2000, driver, element));
			
	}
	else{
	//take picture now
	console.log(await xp_picture(1000, driver, 'success', 
		'Skipping the GAS product. No Product was set up ', actName));
	}
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'could not select ' + GASProdName + '  Maybe its location has been changed? is it an active product?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}



//Start of Account Holder
async function step6_v1(driver, browseIn){
	 //[action6 go to Account holder negative checks] 
  try{
	actName = browseIn + '_6_now_to_acctHolder_withNegacheck'; 
	
	/* step 6 should not do this anymore.
		//so.. if it's a singular product, it goes straight to account holder anyway. 
		//Perform below only on DUAL
		if (commodityType == 'DUAL'){
			console.log(await xp_clicker( 
			actName + ' now on the account holder. Proceeding to do negative checks ',
			'/html/body/app-root/app-generic-product/div/div/div/app-zip-input/form/label/button', 
			'/html/body/app-root/app-generic-product/section[2]/div/app-bundle-builder/div/div[2]/div/button[1]', 
			2000, driver, element));		
		}
	*/
	
	//negative checks made on acct holder
	console.log(await xp_clicker(
		actName + ' Negative checks now made on Acct Holder ',
		'//*[@id="provinceStateSERVICE"]', 
		'//*[@id="AboutYou"]/div/div/app-sequence/button', 
		500, driver, element));

	console.log(await xp_picture(1000, driver, 'success', 
	'Account holder Negative checks were made.', actName));
	
	//Dec 31, 2018 click on the logo and CONTINUE the enrollment
	/*
	console.log(await xp_clicker(
		actName + ' clicked on logo, and continue ',
		'//*[@id="dnn_dnnHeader_dnnLOGO_imgLogo"]', 
		'//*[@id="dnn_dnnHeader_dnnLOGO_imgLogo"]', 
		500, driver, element));

	console.log(await xp_picture(1000, driver, 'success', 
	'Clicked on the logo, to try and go back. Clicked on Continue enrollment', actName + "_continue"));
	
	console.log(await xp_clicker(
		actName + ' clicked on logo, and continue ',
		'//*[@id="homepage-confirm"]/div/button[2]', 
		'//*[@id="homepage-confirm"]/div/button[2]', 
		500, driver, element));
	*/
	
	//change the logoHook to (#Enrollment). This is because the logo has been removed from Step 7 onwards.
	logoHook = '//*[@id="Enrollment"]';
	
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'Was not able to proceed to account holder. Perhaps the button xpath was changed?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}
///!!!//Apr 10, 2019 EOF 2 just for step 6

async function step7_v1(driver, browseIn){
	//[action7 give values to account holder]    
  try{
	actName = browseIn + '_7_Provide_data_to_AccountHolder'; 
	
	if(commodityType == 'DUAL')
	{
		 //path A.. check if gas info is same as ele info.
		await path_AcctHolderSINGLE_BOTH("BOTH", driver, element);
		actName = actName + '_DUALBOTH';
	}
	else if (commodityType == 'ELE') //ELE //literally the same I suppose, except for IDs
	{
		//Path B
		await path_AcctHolderSINGLE_BOTH('BOTH', driver, element); //commodityType
	}
	else if (commodityType == 'GAS') //GAS
	{
		//Path B
		await path_AcctHolderSINGLE_BOTH('BOTH', driver, element); //before, we supply the commodityType
	}
	
	
	console.log(await xp_textboxes(
		actName + ': street',
		'//*[@id="AboutYou"]/div/app-address[1]/form/h5', 
		'//*[@id="InputServiceAddress1SERVICE"]',
		'6345 Dixie Rd',
		200, driver, element));
	
		
	console.log(await xp_textboxes(
		actName + ': addr unitno',
		'//*[@id="AboutYou"]/div/app-address[1]/form/h5', 
		'//*[@id="InputServiceAddress2SERVICE"]',
		'200',
		200, driver, element));
	
	console.log(await xp_textboxes(
		actName + ': city',
		'//*[@id="AboutYou"]/div/app-address[1]/form/h5',
		'//*[@id="InputACitySERVICE"]',
		'Mississauga',
		200, driver, element));
		
	
	
	console.log(await xp_picture(1000, driver, 'success', 
	'all Elements have been given a value', actName)); //make note to check if prices are the same here!
	
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'An element from accountholder here is missing', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}

async function step8_v1(driver, browseIn){
	//[action8 negative click on checkboxes] 
  try{
	actName = browseIn + '_8_check_checkboxes_negative'; 
	
	//skippin this on IL.. no need for nega_checkboxes
	
    //negative checks made on Agreement buttons, for checkboxes
	console.log(await xp_clicker(
		actName + ' Negative checks now made on the agreement checkboxes ',
		'//*[@id="provinceStateSERVICE"]', 
		'//*[@id="AboutYou"]/div/div/app-sequence/button', 
		500, driver, element));
	
	
	console.log(await xp_picture(1000, driver, 'success', 
	'Negative checks on checkboxes made', actName));
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'A checkbox is probably missing', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}

async function step9_v1(driver, browseIn){
	//REFACTOR! what if we want to use Billing address(es)?
  //[action9 check checkboxes] 
  try{
	actName = browseIn + '_9_check_checkboxes'; 
	
	//click billingadress sameas, hooked on city address...
	//only for IL
	console.log(await xp_clicker(
		actName + ': check: sameas',
		'//*[@id="InputACitySERVICE"]', 
		'//*[@id="AboutYou"]/div/app-same-as/form/div/div/label',
		100, driver, element));
	
	//check the optional notes
	//hook to provinceStateSERVICE	
	console.log(await xp_clicker(
		actName + ': check: Special Notice A',
		'//*[@id="InputACitySERVICE"]', 
		'//*[@id="AboutYou"]/div/app-fcc-consent/form/div/div[1]/label/span',
		100, driver, element)); 
	
	 console.log(await xp_clicker(
		actName + ': check: Special Notice B',
		'//*[@id="InputACitySERVICE"]',//'//*[@id="AboutYou"]/div/app-fcc-consent/form/p/strong', 
		'//*[@id="AboutYou"]/div/app-fcc-consent/form/div/div[2]/label/span',
		100, driver, element)); 

	
	console.log(await xp_picture(1500, driver, 'success', 
	'all checkboxes checked. We can now proceed to next step', actName));

	
	console.log(await xp_clicker(
		actName + ': proceed to Utility info',
		'//*[@id="provinceStateSERVICE"]', 
		'//*[@id="AboutYou"]/div/div/app-sequence/button', 
		500, driver, element));
	


	

	}catch(ex){
		
		console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'A checkbox is probably missing', actName));
		
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(ex));
  }
  
}

async function step10_v1(driver, browseIn){
	//[action10 Utility_Information_nega_checks] 
  try{
	actName = browseIn + '_10_Utility_Information_nega_check'; 
	
	//ok let's click on confirm so we can continue
	if(commodityType == 'DUAL' || commodityType =='ELE'){
	console.log(await xp_clicker(
		actName + ': Negative checks for Utility Information',
		'//*[@id="' + EleUtilCode + '-AccountNumber"]', 
		'//*[@id="UtilityInfo"]/div/app-sequence/button[2]', 
		500, driver, element));
	}
	else{
	console.log(await xp_clicker(
		actName + ': Negative checks for Utility Information',
		'//*[@id="' + GasUtilCode + '-AccountNumber"]', 
		'//*[@id="UtilityInfo"]/div/app-sequence/button[2]', 
		500, driver, element));
	}
	
	
	console.log(await xp_picture(1000, driver, 'success', 
	'utility information input', actName));
	
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'utility information failed. Have the element mappings changed? s the fprc valid?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
	
  }
  
  
}

async function step11_v1(driver, browseIn){
	 //[action11 Utility_Information] 
  try{
	actName = browseIn + '_11_Utility_Information'; 
	
	
	
	/*
	console.log(await xp_clicker(
		actName + ': proceed to Utility info',
		'//*[@id="provinceStateSERVICE"]', 
		'//*[@id="AboutYou"]/div/div/app-sequence/button', 
		500, driver, element));
	*/
	
	//will IL ever have prepop?	
	/*
	if(commodityType == 'DUAL')
	{
		//no new home on IL
		
		//*[@id="UtilityInfo"]/app-utility-information/form/h4/a
		//*[@id="Body"]/app-root/app-generic-utility/section/div/div/h1
		console.log(await xp_textboxes(
			actName + ': typed in fprc ',
			'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
			'//*[@id="' + EleUtilCode + '-AccountNumber"]',
			fprc,
			2500, driver, element));
			
		console.log(await xp_textboxes(
			actName + ': typed in fprc',
			'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
			'//*[@id="' + GasUtilCode + '-AccountNumber"]',//'//*[@id="US.IL.GAS.NRGas-AccountNumber"]',
			gfprc,
			500, driver, element));	
	}
	else if(commodityType == 'ELE')
	{
		
		console.log(await xp_textboxes(
			actName + ': Typed in fprc',
			'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
			'//*[@id="' + EleUtilCode + '-AccountNumber"]',
			fprc,
			500, driver, element));	
		
	}
	else if(commodityType == 'GAS')
	{
		console.log(await xp_textboxes(
			actName + ': typed in fprc',
			'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
			'//*[@id="' + GasUtilCode + '-AccountNumber"]',
			gfprc,
			500, driver, element));	
	}
	*/
	//appy a try and catch approach 
	try{
		if(EleUtilCode != ''){ //proceed with Gas Utility
			console.log(await xp_textboxes(
			actName + ': Typed in fprc',
			'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
			'//*[@id="' + EleUtilCode + '-AccountNumber"]',
			fprc,
			500, driver, element));	
		}else{
			console.log("ELE Utility Number is not necessary");
		}
	}
	catch(ex){
		console.log("Was not able to Input Ele utility... perhaps it was unecessary");
	}
	
	
	try{
		if(GasUtilCode != ''){ //proceed with Gas Utility
			console.log(await xp_textboxes(
				actName + ': typed in fprc - GAS',
				'//*[@id="Enrollment"]/app-wizard/section/div/div[1]', 
				'//*[@id="' + GasUtilCode + '-AccountNumber"]',
				gfprc,
				500, driver, element));	
		}else{
			console.log("GAS Utility Number is not necessary");
		}
	}
	catch(ex){
		console.log("Was not able to Input Gas utility... perhaps it was unecessary");
	}
	
	//ok, now everything is provided, take a screenshot kid.
	console.log(await xp_picture(1000, driver, 'success', 
	'Utility has been provided', actName + '_acctNumbers'));
	
	/////
	//ok let's click on confirm so we can continue
	if(commodityType == 'DUAL' || commodityType =='ELE'){
	console.log(await xp_clicker(
		actName + ': Proceed to Finalize Data',
		'//*[@id="' + EleUtilCode + '-AccountNumber"]', 
		'//*[@id="UtilityInfo"]/div/app-sequence/button[2]', 
		500, driver, element));
	}
	else{
	console.log(await xp_clicker(
		actName + ': Proceed to Finalize Data',
		'//*[@id="' + GasUtilCode + '-AccountNumber"]', 
		'//*[@id="UtilityInfo"]/div/app-sequence/button[2]', 
		500, driver, element));
	}
	
	
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'utility information failed. Have the element mappings changed? s the fprc valid?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
  
}

async function step12_v2(driver, browseIn){
	 //[action12 Final steps..REFACTOR, CHANGE TO A LOOP] 
  try{
	actName = browseIn + '_12_Final_steps'; 
	
	//get a screenshot of the initial page
	console.log(await xp_picture(1000, driver, 'success', 
	'Page summary screenshot', actName + '-TransactionSummary'));
	
	//declare negative variables for negative checking
	var negaHook ='//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/div[1]/h4';
	var negaButton ='//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/div[3]/app-sequence/button[2]';
	
	//--- Terms and Conditions
	console.log(await acct_xp_clicker(
		actName + ': click on "Accept terms and conditions"',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/app-pdf-embed[1]/div[1]/strong', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[1]/app-acknowledgement/form/div[1]/div/label', 
		500, driver, element, negaHook, negaButton, 'TandC'));
	
	
	console.log(await acct_xp_clicker(
		actName + ': click on "Utility NYISO"',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/app-pdf-embed[1]/div[1]/strong', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[1]/app-acknowledgement/form/div[2]/div/label', 
		500, driver, element, negaHook, negaButton, 'U_NYISO'));
		
	
	console.log(await xp_picture(1500, driver, 'success', 
	'Terms and COnditions done', actName + '_1_TnC_NYISO'));
	
		
	//--- Bill of Rights	
	console.log(await acct_xp_clicker(
		actName + ': click on "Bill of rights"',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/app-pdf-embed[2]/div[1]/strong', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[2]/div/app-acknowledgement/form/div/div/label', 
		500, driver, element, negaHook, negaButton, 'BofR'));
		
	console.log(await xp_picture(1500, driver, 'success', 
	'Bill of rights confirmed', actName + '_2_BoR'));
	
	
	//---- Final checkboxes
	console.log(await acct_xp_clicker(
		actName + ': click on final checkbox 1',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/h5', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/app-acknowledgement/form/div[1]/div/label', 
		500, driver, element, negaHook, negaButton, 'final1'));

	console.log(await acct_xp_clicker(
		actName + ': click on final checkbox 2',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/h5', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/app-acknowledgement/form/div[2]/div/label', 
		500, driver, element, negaHook, negaButton, 'final2'));

	console.log(await acct_xp_clicker(
		actName + ': click on final checkbox 3',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/h5', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/app-acknowledgement/form/div[3]/div/label', 
		500, driver, element, negaHook, negaButton, 'final3'));	
	
	console.log(await xp_picture(1500, driver, 'success', 
	'all Statements have been agreed upon', actName + '_3_Lastchks'));
	
	//checkout at this point	
	console.log(await xp_clicker(
		actName + ': checkout at this point',
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/div[1]/h4', 
		'//*[@id="Body"]/app-root/app-ny-confirmation/div/div/div[1]/div/section/div/div[3]/div[3]/app-sequence/button[2]', 		
		500, driver, element));
	
	//wait for the confirmation to appear
	
	await driver.wait(until.elementLocated(By.xpath('//*[@id="EnrollmentComplete"]')), 60000, "err : the Enrollment was never complete on the last step...");
	element = await driver.findElement(By.xpath('//*[@id="EnrollmentComplete"]/div/h4'));
	await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(200);	
		

	
	//screenshot here... test is over
	console.log('TEST IS OVER');
	
	
	//last step
	console.log(await xp_picture(1000, driver, 'success', 
	'We checked out successfully', actName));
	
  }catch(ex){
	
	console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'Checkout did not proceed successfully. Was a document missing?', actName));
	
	//mail the error, and exit the test
	await cMailer.mailIt(csName, scrnsList);
	return Promise.reject(new Error(ex));
  }
  
}
//end of COLD CASE

//start of WARM Cases

//warm cases are unused at the moment. could possibly be useful in the future.
async function warmCase(driver, browseIn){
	
	//for now... works on DUAL
	//[action 0: load the PREPOP URL]	
	await w_step0_v1(driver, browseIn);

	//[action6 go to Account holder, negacheck] 
   //await step6_v1(driver, browseIn);
	 
   //[action7 give values to account holder]    
   await step7_v1(driver, browseIn);
	 
  
  //[action8 negative click on checkboxes] 
   await step8_v1(driver, browseIn);
	 
  //REFACTOR! what if we want to use Billing address(es)?
  //[action9 check checkboxes] 
   await step9_v1(driver, browseIn);
	 
//skip action 10 and 11, as warm enrollment always have fprc  
  //[action10 Utility_Information_nega_checks] 
   //await step10_v1(driver, browseIn);
	 
  
  //[action11 Utility_Information] 
   //await step11_v1(driver, browseIn); 
	 
  
  //[action12 Final steps..] 
   await step12_v2(driver, browseIn);
}

async function w_step0_v1(driver, browseIn){
	 //[action 0: load the PREPOP URL]
	 try
	 {
		 actName = browseIn + '_0_WARM_ENROLLMENT_initialized'; 
		  //setup files here, from the main JSON file
		  await driver.get(baseUrl);

		 //wait until the element is present
		 console.log(await xp_textboxes(
			actName + ': FirstName',
			'//*[@id="Authorization"]/app-security-question/form/h4', 
			'//*[@id="InputAnswer"]',
			securityAns,
			3000, driver, element));
		
		//set commodityType to DUAL so that on Step 6, the automation won't have to click on a button to do the negacheck
		//identify the type of commodity we're going to do. Is it DUAL, ELE or GAS only?
		 if(GASProductPath !='' && ELEProductPath != '')
			{ commodityType = 'DUAL'; }
			else if (ELEProductPath != '')
			{ commodityType='ELE'; }
			else if (GASProductPath != '')
			{ commodityType ='GAS'; }
		
		
		console.log(await xp_picture(1000, driver, 'success', 
		'Warm enrollment Initiated.. url is ' + baseUrl, actName));
	
	
		//click on next button to proceed to next step
		console.log(await xp_clicker( 
			actName + ' now on the account holder. Proceeding to do negative checks ',
			'//*[@id="Authorization"]/app-security-question/form/h4', 
			'//*[@id="Authorization"]/app-security-question/form/div[2]/button[2]', 
			2000, driver, element));	
	
		//driver.sleep(3000);
		
		
		//see if the sameas is checked or not
		/*
		var zz = '//*[@id="ELE-GAS-CONTACTSameAs"]';
		await driver.wait(until.elementLocated(By.xpath(zz)));
		element = await driver.findElement(By.xpath(zz));
		await driver.executeScript("arguments[0].scrollIntoView()", element);
		var isch = await element.getAttribute("checked");
		console.log(await 'CHECKBOX VALUE IS : ' + isch);
	
		driver.sleep(4000);
		
		*/

		

		//click  "set the customer info is same as" to set it as false
		/*
		console.log(await xp_clicker(
		actName + ': Temporary solution for this particular URL... setting it as true ',
		'//select[@id="relationshipToAccountHolder"][1]', 
		'//*[@id="AboutYou"]/div/app-same-as[1]/form/div/div/label', //*[@id="ELE-GAS-CONTACTSameAs"]', 
		2000, driver, element));
		*/
		
	}catch(ex)
	 {
		console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
	'Was not able to proceed to account holder. was securityAns incorrect??', actName));
		
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(ex));
	 } 
}

//end OF WARM CAses

//!!! --Apr 10, 2019 -Tag ext. Delete clickers as well
//!!! Tag testing with extensions (for Chrome only) (Mar 26,2019)
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
		'QA tag has been injected now.', "chrome_tag_injector"));
		
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
		'Tag Assistant is now recording', "chrome_TagAssistantsetup"));
		
	
	}catch(ex){
		
		console.log(await xp_picture(1000, driver, 'ERROR' + ex, 
		'was not able to complete setup on Tags!', "Google Tags and analytics testing."));
		
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
		*/
		
		var editHtml = await fsprom.readFile(currFoldr + '/GoogleAssistantResult.html', 'utf8');
		
		var rsultHtml = await editHtml.replace(/width="100/g, 'width="3');
		rsultHtml = await rsultHtml.replace(/height="100/g, 'height="3');
		rsultHtml = await rsultHtml.replace(/\r?\n|\r/g, '');
		rsultHtml = await rsultHtml.replace('<button class="md-icon-button md-button md-taux-theme md-ink-ripple ng-hide" type="button" ng-transclude="" ng-show="ignoreCtrl.ignored" aria-label="Remove from Ignore list" aria-hidden="true"><md-icon md-svg-icon="add" class="md-taux-theme" role="img" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="3%" height="3%" viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg></md-icon></button>', ''); 
		 
		await fsprom.writeFile(currFoldr + '/GoogleAssistantResultModf.html', rsultHtml);
		
		await console.log("data converted successfully!");
		
		
		
		
		
		//well, downloaded the file.
		console.log(await xp_picture(1000, driver, 'success', 
		'Tag Assistant is now Disabled, and report attached. <br />' + 
		"Please visit <a href='" + currURL + "'>" + currURL + '</a> for the results', 
		"chrome_Tag_ReportDisabled"));
		
		
		
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
		'was not able to complete tag checking!!', "GoogleTagsandanalytics_testingErr"));
		
		//mail the error, and exit the test
		await cMailer.mailIt(csName, scrnsList);
		return Promise.reject(new Error(ex));
	  }
}

//download the PDF from the report.

//!!! Precision tools, uses xpath. A little fragile... but most reliable since no elements have ID and classes

//just takes a screenshot for our email 
async function xp_picture(delay, driver, result, yourNote, actName){	
	try
	{
		await driver.sleep(delay);
		await cshot.takeScreenshot(driver, currFoldr + '/' + actName +'.png'); //name the action. Actname is always passed thru all steps
		
		durTime = await durSet(currDT, prevDT, durTime); //set the duration of the action
		await cLister.addToList(currFoldr + '/' + actName +'.png', actName, scrnsList, durTime, result, 
		yourNote); 
		
		await driver.sleep((delay + browserSpec)/2);
		return yourNote;
	}
	catch(ex)
	{	
		return Promise.reject(new Error(ex));
	}
}


//!!! paths for AccountHolder
//BOTH type
async function path_AcctHolderSINGLE_BOTH(elementsAre, driver, element)
{
	//check if the gas is same as ele 
	var negaHook = '//*[@id="provinceStateSERVICE"]';
	var negaButton ='//*[@id="AboutYou"]/div/div/app-sequence/button';
	
	console.log(await acct_xp_textboxes(
		actName + ': FirstName',
		logoHook, 
		'//*[@id="InputFirstName' + elementsAre + '"]',
		InputFirstName,// "AUTOMATION-" + csName,
		300, driver, element, negaHook, negaButton, 'AHSBFirstName'));
		
	//hook to firstname
	console.log(await acct_xp_textboxes(
		actName + ': LastName',
		'//*[@id="InputFirstName' + elementsAre + '"]', 
		'//*[@id="InputLastName' + elementsAre + '"]',
		InputLastName,
		300, driver, element, negaHook, negaButton, 'AHSBLastName'));
	
	console.log(await acct_xp_textboxes(
		actName + ': Email',
		'//*[@id="InputFirstName' + elementsAre + '"]',
		'//*[@id="InputEmail' + elementsAre + '"]',
		InputEmail,
		300, driver, element, negaHook, negaButton, 'AHSBEmailName'));
		
	console.log(await acct_xp_textboxes(
		actName + ': Home Phone',
		'//*[@id="InputFirstName' + elementsAre + '"]',
		'//*[@id="InputPhone' + elementsAre + '"]',
		InputPhone,
		300, driver, element, negaHook, negaButton, 'AHSBPhoneName'));
	
		//hook to Home phone
	console.log(await acct_xp_selector(
		actName + ': relationship to account holder-same',
		'//*[@id="InputEmail' + elementsAre + '"]', 
		"//select[@id='relationshipToAccountHolder'][1]", 
		"//option[@value='" + relationshipToAccountHolder + "']", 
		500, driver, element, negaHook, negaButton, 'AHSBRelationship'));
		
	//Jan 10,2019 Relationship to account holder
		if (referredBy != '') { //we can proceed with referredby steps
		
			console.log(await acct_xp_selector(
				actName + ': referred by',
				'//*[@id="InputEmail' + elementsAre + '"]', 
				"//select[@id='referred-by']", //"//select[@id='relationshipToAccountHolder']", 
				"//option[@value='" + referredBy + "']", 
				500, driver, element, negaHook, negaButton, 'referred-by'));
				
			//now, we can also proceed to give value to the next option
			console.log(await acct_xp_textboxes(
				actName + ': referred by given value',
				'//*[@id="InputEmail' + elementsAre + '"]', 
				"//*[@id='referredByValue']", //"//select[@id='relationshipToAccountHolder']", 
				referredByValue,//"//option[@value='" + referredByValue + "']", 
				500, driver, element, negaHook, negaButton, 'referred-by-given-value'));
		}
		
}

//ACCOUNT HOLDER specifics. always do negative checks first, screenshot, then put correct values.
async function acct_xp_textboxes(yourNote, hook, toInput, theInput, delay, driver, element, 
									negaHook, negaButton, imgName){	
	try{
		//do the negative check
		console.log(await xp_clicker(
			' Negative checks for ' + yourNote,
			negaHook, 
			negaButton, 
			500, driver, element));
		
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(delay/2); //200 scrolling is way too fast, lol
		
		//screenshot, the negative check was made
		console.log(await xp_picture(1000, driver, 'success', 
			'Negative check made for: ' + yourNote, imgName + '_nega'));
		
		
		//ProvideInput 
		await driver.wait(until.elementLocated(By.xpath(toInput)), waitUntil, ' err : Input element not present' + toInput);
		element = await driver.findElement(By.xpath(toInput));
		
		await xp_cleartxt(element);
		
		await element.sendKeys(theInput); await driver.sleep(delay + browserSpec); 
		
		//screenshot the fact we typed in the values now.
		console.log(await xp_picture(1000, driver, 'success', 
			'Value given for: ' + yourNote, imgName + '_provided'));
		
		return yourNote;
		//Promise.resolve(yourNote);
	}catch(ex)
	{
		return Promise.reject(new Error("The element does not exist! " + ex)); //this means it's required...
	}
}

async function acct_xp_selector(yourNote, hook, toClick, toSelect, delay, driver, element,
									negaHook, negaButton, imgName){		
	try
	{
		//do the negative check
		console.log(await xp_clicker(
			' Negative checks for ' + yourNote,
			negaHook, 
			negaButton, 
			500, driver, element));
		
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(200); //scrolling is way too fast, lol
		
		//screenshot, the negative check was made
		console.log(await xp_picture(1000, driver, 'success', 
			'Negative check made for: ' + yourNote, imgName + '_nega'));
		
		
		//click
		await driver.wait(until.elementLocated(By.xpath(toClick)), waitUntil, 'err : toClick not present' + toClick);
		element = await driver.findElement(By.xpath(toClick));
		await element.click(); await driver.sleep(delay + browserSpec); 
		
		//toSelect (now that's clicked, let us select the inner element)
		await driver.wait(until.elementLocated(By.xpath(toSelect)), waitUntil, 'err : toSelect not present' + toSelect);
		element = await driver.findElement(By.xpath(toSelect));
		await element.click(); await driver.sleep(delay + browserSpec);
		
		//screenshot the fact we typed in the values now.
		console.log(await xp_picture(1000, driver, 'success', 
			'Value given for: ' + yourNote, imgName + '_provided'));
		
		
		return yourNote;
	}
	catch(ex)
	{
		return Promise.reject(new Error(ex));
	}
}

async function acct_xp_clicker(yourNote, hook, toClick, delay, driver, element,
									negaHook, negaButton, imgName){
	//implement a... try catch?
	try{
		//negative check
		console.log(await xp_clicker(
			' Negative checks for ' + yourNote,
			negaHook, 
			negaButton, 
			500, driver, element));
		
		//hook
		await driver.wait(until.elementLocated(By.xpath(hook)), waitUntil,'err : Hook is not present ' + hook);
		element = await driver.findElement(By.xpath(hook));
		await driver.executeScript("arguments[0].scrollIntoView()", element); await driver.sleep(200); //scrolling is way too fast, lol
		
		//screenshot for nega
		console.log(await xp_picture(1000, driver, 'success', 
			'Negative check made for: ' + yourNote, imgName + '_nega'));
		
		//click
		await driver.wait(until.elementLocated(By.xpath(toClick)), waitUntil,'err : toClick not present' + toClick);
		element = await driver.findElement(By.xpath(toClick));
		await element.click(); await driver.sleep(delay + 500 + browserSpec); 
		
		
		//screenshot for success		
		console.log(await xp_picture(1000, driver, 'success', 
			'Value given for: ' + yourNote, imgName + '_provided'));
		
		
		return yourNote + ' delay is : ' + delay + ' browser spec is ' + browserSpec;
		
	}catch(ex)
	{
		//return ex; //will this get caught by the main function's try catch?
	    return Promise.reject(new Error(ex));
	}	
}

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


//!!! click on all relevant links PER PRODUCT
async function click_allLinks(actName, driver, element){
	//get the count of items first	
	var totCount = 0;
	try
	{
		
		//alright... so below is the appearance of each link. 
		//let's loop to each of it dude and see until which point the clicker fails.
		
	//	/html/body/modal-container/div/div/div[2]/div/div[2]/div[2]/div/div[2]/p/app-document-list/a[1]		
	//	/html/body/modal-container/div/div/div[2]/div/div[2]/div[2]/div/div[2]/p/app-document-list/a[4]
		
		//let's use this try catch structure dude, while iterating for each element 
		//we'll use an infinite loop until the try fails and we exit
		try{
			while (totCount != -1){ //infini loop
				//start adding value
				totCount = totCount + 1;
				actName = actName + '_' + totCount;
				
				//locate the element
				await driver.wait(until.elementLocated(
				By.xpath('//*[@id="Body"]/modal-container/div/div/div[2]/div/div[2]/div[2]/div/app-product-detail-price/div[2]/p/app-document-list/div[' + 
					totCount + ']/a')) ,waitUntil);					
				
				element = await driver.findElement(
				By.xpath('//*[@id="Body"]/modal-container/div/div/div[2]/div/div[2]/div[2]/div/app-product-detail-price/div[2]/p/app-document-list/div[' + 
					totCount + ']/a'), waitUntil);

				//apr 4, 2019 modified new links
				//*[@id="Body"]/modal-container/div/div/div[2]/div/div[2]/div[2]/div/app-product-detail-price/div[2]/p/app-document-list/div[1]/a
				//*[@id="Body"]/modal-container/div/div/div[2]/div/div[2]/div[2]/div/app-product-detail-price/div[2]/p/app-document-list/div[2]/a
				
				//old format
				//'/html/body/modal-container/div/div/div[2]/div/div[2]/div[2]/div/div[2]/p/app-document-list/a[' + totCount + ']'
				
				
				//click it.
				await element.click();
				//console.log("First ELE clicked for " + actName);
				
				
				//wait until the div loads. the element below won't exist if the pdf doesn't fully load
				//await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div[2]/div[4]/div[2]/div[1]/div/div[1]/div[1]')) ,20000, ' ERR : the pdf never loaded! WARNING! ');
				
				// /html/body/div[1]/div[2]/div[4]/div[2]/div[1]/div/div[1]/div[1]
				
				
				//take picture now... may take a while before document loads anyway
				console.log(await xp_picture(linkDelay, driver, 'success', 
					actName + ' product picture was taken', actName));
				
				//close the modal now. Apr 4, 2019 still the same element
				await driver.wait(until.elementLocated(
				By.xpath('/html/body/modal-container[2]/div/div/app-pdf-modal/div[3]/button')),
					waitUntil);
				
					
				//apr 4, 2019 new test
				//*[@id="Body"]/modal-container/div/div/div[3]/button

				element = await driver.findElement(By.xpath('/html/body/modal-container[2]/div/div/app-pdf-modal/div[3]/button'), 
					waitUntil);
 				
				await element.click(); await driver.sleep(2000 + browserSpec); //too fast.. maybe it needs to sleep after the close.
				
			}
		}
		catch(ex){
			console.log("End of links for product check for " + actName + '..hopefully all images caught' + '    ');
		}
		
	}
	catch(ex)
	{
		
	}
}

//!!-- Apr 10, 2019 EOF tag ext

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
	module.exports.browseIn = function(val){
		browseIn = val;
	}
	module.exports.browserSpec = function(val){ browserSpec = val; }
	module.exports.linkDelay = function(val){ linkDelay = val; }
	module.exports.zipCode = function(val){ zipCode = val;}	
	module.exports.securityAns = function(val){ securityAns = val; }
	module.exports.ELEProdName = function(val) { ELEProdName = val; }
	module.exports.ELEProductPath = function(val) { ELEProductPath = val; }
	module.exports.EleUtil = function(val) { EleUtil = val; }
	module.exports.EleUtilCode = function(val) { EleUtilCode = val; }
	module.exports.fprc = function(val) { fprc = val; } 
	module.exports.GASProdName = function(val) { GASProdName = val; }
	module.exports.GASProductPath = function(val) { GASProductPath = val; }
	module.exports.GasUtil = function(val) { GasUtil = val; }
	module.exports.GasUtilCode = function(val) { GasUtilCode = val; }
	module.exports.gfprc = function(val) { gfprc = val; }
	module.exports.planType = function(val) { planType = val; }
	module.exports.SelectPrefix = function(val) {  SelectPrefix = val; } 
	
	module.exports.InputFirstName = function(val) { InputFirstName = val; }
	
	module.exports.InputMiddleName =function(val) {  InputMiddleName= val; }
	module.exports.InputLastName =function(val) {  InputLastName= val; }
	module.exports.InputEmail = function(val) { InputEmail= val; }
	module.exports.InputPhone = function(val) { InputPhone= val; } 
	module.exports.InputPhoneExt = function(val) { InputPhoneExt= val; } 
	module.exports.InputAltPhone = function(val) { InputAltPhone= val; } 
	module.exports.InputAltPhoneExt = function(val) { InputAltPhoneExt= val; }
	module.exports.relationshipToAccountHolder = function(val) { relationshipToAccountHolder= val; }
	
	module.exports.referredBy = function(val) { referredBy= val; }
	module.exports.referredByValue = function(val) { referredByValue= val; }
	
//!!! -- Apr 10, 2019 pixel and drop 4 vars
	//gtm pixel test
	module.exports.gtmPixelTest = function(val) { gtmPixelTest= val; }
	module.exports.gtmID = function(val) { gtmID= val; }
	
	
	//Drop 4 new vars
	module.exports.isRB = function(val) { isRB= val; }
	
	module.exports.case1 = case1;
//!!! -- Apr 10, 2019 EOF pixel and drop 4 vars	

	//Apr 22, 2019
	//for residentialPlans page (can possibly be STG or QAS)
	var residentialPlansPage = 'https://justenergyweb-qas-webapp01.azurewebsites.net/residential-plans/#/enrollment/US/NY/SVC/residential-plans';
	module.exports.residentialPlansPage = function(val) { residentialPlansPage= val; };
	

//tester, to see if the parameters were passed successfully
async function currParameters(){
	console.log("----------Start of Parameters for " + csName + "--by" + QAInvolved + "--------");
	console.log(QAInvolved);
	console.log(csName);
			console.log(baseUrl);
			console.log(browseIn);
			console.log(browserSpec);
			console.log(linkDelay);
			console.log(zipCode);
			console.log(securityAns);
			console.log(ELEProdName);
			console.log(ELEProductPath);
			console.log(EleUtil);
			console.log(EleUtilCode);
			console.log(fprc);
			console.log(GASProdName);
			console.log(GASProductPath);
			console.log(GasUtil);
			console.log(GasUtilCode);
			console.log(gfprc);
			console.log(planType);
			console.log(SelectPrefix);
			console.log(InputFirstName);
			console.log(InputMiddleName);
			console.log(InputLastName);
			console.log(InputEmail);
			console.log(InputPhone);
			console.log(InputPhoneExt);
			console.log(InputAltPhone);
			console.log(InputAltPhoneExt);
			console.log(relationshipToAccountHolder);
			console.log("----------END--------");
			
}

