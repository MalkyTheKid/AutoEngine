const fs = require('fs');

async function takeScreenshot(driver, file){
	
	
	try{
		/*
		let image = await driver.takeScreenshot; //this has the most problem currently...	
		await fs.writeFile(file, image, 'base64', (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			});
			*/
		
		//fs.writeFile(file, "CR3_GettyImages-159018836.jpg", 'base64');
		
		let image = await driver.takeScreenshot(); //this has the most problem currently...	
		fs.writeFile(file, image, 'base64',function(err, result) {
				 if(err) console.log('error', err);				 
			 });
			 
	  
		//push value to the screenshots
		return true;
	}
	catch(ex){
		console.log("cTakeScreenshot error :: "  + ex);
		return ex;
	}
	
}

module.exports.takeScreenshot = takeScreenshot; //call this for screenshots