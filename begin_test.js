/*
	Requirements:
		please follow the same pattern for all cases... do not leave anything as blank
		if you do leave anything blank, the defaults will take effect.
	Logic:	
		1. Iterate on each file
		2. Determine Jurisdiction, so that we know which Code it would initialize
		3. Pass the variables QA set to that file 
		4. Start the test.
		
	begin_test notes:	
		Sept 10, 2018: placed location of the base files in the "baseFiles" folder.
		Sept 17, 2018: Added 'csvtojson' for converting csv to json
		


	TestSteps.json design
	 - Provide ID/Name	

	 events
	  - browse: browse the url in the site
	  - type: types on the element in question
			(stepName, identifier, write, delay, hook)
			 console.log(await xp_textboxes(
				(stepName),
				(hook if present, if not use identifier), 
				(identifier),
				(write), (delay), driver, element));	
	  - - clearText: clear a textbox.
			console.log(await xp_cleartxt(element, driver)) (just fired when )	
	  - dropdown: selectbox/dropdown
		  (provide the path, then provide the exact value the script should click)
		 	console.log(await xp_selector(
				(stepName),
				(hook if present, if not use identifier), 
				(identifier), 
				"//*[@id='(identifier)']/option[text()[contains(., '" + (option) + "')]]", 
				1500, driver, element));			

	  - click: clicking the elements
		  (for Radio buttons and Checkboxes.... we can use name?)
			console.log( await xp_clicker(
					(stepName),
					(hook if present, if not use identifier), 
					(identifier), 
					(delay), driver, element));
	  

	  - screenshot: takes a screenshot
		(gets a screenshot. Provide an error on the event (hmmm use the stepName))
		(provide screenshotName)
		(ON ERRORS: use the stepname)
			console.log(await xp_picture(1000, driver, 'ERROR on ' + (stepName), 'error notes on ' + (stepName),  (stepName));
		(ON SUCCESS: use success)
			console.log(await xp_picture(1000, driver, success,  'Success Note on ' + (stepName), (stepName));
		
		*each event, let's take a photo after. It's on the autoEngine script
		*

	  - wait: sleeps the driver
			console.log(await xp_wait(yourNote, delay, driver))	
	  - switchTab: switches the tab. tabNo begins with 0.
			xp_switchtab((stepname) + " - switching tabs ", (tabNumber), delay, driver, element)

	  -are there any other events that we need to check on?
	  
	  
*/

const fs = require("fs"); //for files
const csv =  require("csvtojson"); //for converting csv to json
const readline = require("readline"); //for reading content of .csv

const path = require('path');
const os = require('os');
const dtL = require('node-datetime');

//the Juridiction Tester Files

var QAVars;
var testType;
var dt; //dtL.create();
var currPlace = 0;
var fname;
var particularObj;
var currQAparams;

var rawSetup;// = fs.readFileSync("cAutoSetup.json");
var jsonSetup; //= JSON.parse(rawSetup);
var cSetup; //= injectCSV(jsonSetup);//JSON.parse(rawSetup);

//at this point, add the csv in the json code
//console.log(cSetup);

var autoEngine = './basefiles/autoEngine.js';//'./basefiles/defaultSetup.js';//require(__dirname + "/basefiles/autoEngine.js");

//below initializes the tests
var testMode = process.argv[2]; // could be blank, csv, json, both




startTest();
//!!!Start of JSON based setup.
async function  startTest(){
	//payload 
	rawSetup = await fs.readFileSync("./setup/TestSteps.json"); //read from the JSON file, then parse as a JSON object here
	jsonSetup = await JSON.parse(rawSetup);
	cSetup = jsonSetup; 
	
	// include csv.. 
	if (testMode == "csv" || testMode == "both"){
		console.log("Injecting CSV tests as well");
		await injectCSV(jsonSetup); //now, inject the setup with the csv file.
	}
	
	for (var ii in cSetup) //
		{
			//See if you can Iterate correctly
			//baseUrl = cSetup[ii].TestURL;
			//iterate on the inner cases
			QAVars = cSetup[ii].Cases;
			for (var iii in QAVars)
			{
				let currQAparams = QAVars[iii];
				//console.log("QA is : " + QAVars[iii].QAInvolved);
				
				
				dt = dtL.create();
				dt = dt.format('Y-m-d-H-M-S');
				currPlace = currPlace + 1;
				
				
				// now we start the test based on the "Cases" on TestSteps.json
				await initializeTest(QAVars[iii], dt, currPlace, testType, currQAparams);
				
			}
		}
		
	
	return 'Tests initialized and are running \n';
	
}


//pass the variables.. and start the test
async function initializeTest(QA_obj, dt, currPlace, testCase, currQAparams)
	{
			let conv = QA_obj.caseName.replace(/ /g, "_") + QA_obj.QAInvolved.replace(/ /g, "_");
			let fname = './previousRuns/' + conv + '-' + dt + currPlace + '.js';

			let currFoldr = "./ScrnShots/" + conv + '-' + dt + currPlace;
			await fs.mkdir(currFoldr, err => { 
					if (err && err.code != 'EEXIST') throw 'err' //error occured
			});  
			//something odd here... if the deployment problem arises next time move this to the engine itself

			 await fs.copyFile(autoEngine, 
						fname, (err) => {
								if (err) throw 'Error in initializing the ' + testCase + ' file...' + err;
								
								console.log('File ' + fname + ' Initialized');
								//At this point the file was created.
								//execute via IIFE so it gets executed immediately
								(function(){
									let test_Gen = require(fname);
									let genObjs = currQAparams;
									console.log(genObjs);
									
									let objectStart = setupFileStartTest(test_Gen, genObjs, currFoldr);
									//problem here^ IIFE is not executing asynchronously
								})();
							});
			  
			return;			
	}
	
async function setupFileStartTest(test_Gen, QA_Parameters, currFoldr)
		{
			
			 console.log("Starting test by : " + QA_Parameters.QAInvolved.toString() + ': ' + QA_Parameters.caseName.toString());
			
			//setup the variables.
			
			//let's use a try catch for this. On error, just let the user know that it was not provided.. and continue
			try{ test_Gen.QAInvolved(QA_Parameters.QAInvolved); } catch(ex) { console.log("No QAInvolved Parameter"  + ex); }
			
			let conv = QA_Parameters.caseName.replace(/ /g, "_");
			try{ test_Gen.caseName(conv); } catch(ex) { console.log("No caseName Parameter" + ex); }
			
			try{ test_Gen.baseUrl(QA_Parameters.baseUrl); } catch(ex) { console.log("No baseUrl Parameter"  + ex); }
			try{ test_Gen.testIn(QA_Parameters.testIn); } catch(ex) { 
				
				console.log("!!!--ERROR--!!! No testIn Parameter. Please indicate 'chrome','ie' or 'firefox' in TestSteps.json"  + ex); 
				return;
			}
			
			//delay between steps. For faster applications I think we can set this to less than 1000 (1 second.) 
			//otherwise, just leave this as 1000 in the setup file
			try{ test_Gen.delay(parseInt(QA_Parameters.delay)); } 
				catch(ex) { 
					console.log("No linkDelay Parameter. Will use default values"  
					+ ex);
				 }

			//a delay we have to adjust for the particular browsers (for example, IE is slow.)
			try{ test_Gen.browserSpec(parseInt(QA_Parameters.browserSpec)); } 
				catch(ex) { 
					console.log("No browserSpec Parameter. WIll use default values" 
						+ ex); 
				}
			
			//this is the timeout: the amount of time the test has to wait for a response, before calling it an error. 
			try{ test_Gen.waitUntil(parseInt(QA_Parameters.waitUntil)); } 
				catch(ex) { console.log("No WaitUntil Parameter. Will use default values" + ex); }
			
			//submit the steps now. If no steps provided, don't proceed.
			try{ test_Gen.steps(QA_Parameters.steps); } catch(ex) { 
				console.log("!!!--ERROR--!!! Please include steps for the test! Since there are no steps, we are not proceeding with the test. Indicate in TestSteps.json" + ex); 
				return;
			}
			
			try{ test_Gen.currFoldr(currFoldr); } catch(ex) { console.log("Was not able to set report folder" + ex); }


			//start the test.
			//if the parameter isn't available... it will use the default parameters in that page
			 
			return test_Gen.beginTest;
			

		}		
//!!!---END OF JSON BASED SETUP


//hmmm, we may have trouble with .csv. 
// how will that work with the step engine??

//!!!Start of .csv based setup, the data will be inserted on the value
//remove comment on startTest() (or on the initial declaration above)

async function injectCSV(dSource){
		//the JSON data from cAutoSetup is given to completeData.
		var completeData = await dSource;
		var rd; //for reading lines
		var initPath = "./Test_Setup/cCurrentTests.csv";
		
		//copy the "CurrentTests.csv" file, so we have a log of previous runs
		dt = dtL.create();
		dt = dt.format('Y-m-d-H-M-S');
		fs.copyFile('./Test_Setup/cCurrentTests.csv', 
						'./Test_Setup/logs/cCurrentTests' + dt + '.csv', (err) => {
								if (err) throw ' Was not able to create a log of the "CurrentTests.csv" file ';
							});
							
		fs.copyFile('./Test_Setup/cAutoSetup.json', 
						'./Test_Setup/logs/cAutoSetup' + dt + '.json', (err) => {
								if (err) throw ' Was not able to create a log of the "cAutoSetup.json" file ';
							});
							
		//pass the csv format the QA has setup.
		var jsonArray = await csv().fromFile(initPath);
		
		
		
		//await completeData[0].Cases.push({"jurisdiction":"ON"}); //we can do per string	
		//await completeData[0].Cases.push(jsonArray[0]); //we can do only the first line..
		
		//OR we can iterate on the csv file, and add all of the listed items!
		for (var i=0; i<jsonArray.length; i++) {
			await completeData[0].Cases.push(jsonArray[i]); 
		}
		
		return completeData;
		
	}

//!!!---END OF .csv BASED SETUP	
	
	
	
	//remotely access and begin the test
	module.exports.testMode = testMode;
	module.exports.startTest= startTest;
	
	