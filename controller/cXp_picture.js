
const {Builder, By, Key, until} = require('selenium-webdriver');
var waitUntil = 20000; //Considering IE takes the longest.
var browserSpec = 800; //average speed browsers would take man.	
const cshot = require(__dirname + "/../controller/cTakeScreenShot.js");
const dtL = require('node-datetime');
const cLister = require(__dirname + "/../controller/cAddToList.js");

async function xp_picture(delay, driver, result, 
	yourNote, actName, currFoldr, scrnsList){	
	try
	{
		await driver.sleep(delay);
		
		await cshot.takeScreenshot(driver, currFoldr + '/' + actName.replace(" ", "_") +'.png'); 
		
		durTime = await durSet(currDT, prevDT, durTime); //set the duration of the action
		await cLister.addToList(currFoldr + '/' + actName +'.png', 
			actName, scrnsList, durTime, result, 
		yourNote); 
		
		await driver.sleep((delay + browserSpec)/2);
		return yourNote;
	}
	catch(ex)
	{	
		return Promise.reject(new Error(ex));
	}
}


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



module.exports.browserSpec = browserSpec;
module.exports.xp_picture = xp_picture;
module.exports.waitUntil = waitUntil;