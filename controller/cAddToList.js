
async function addToList(fPath, ccid, theList, Dur, rsult, cmment){
		
		
	try
	{
		console.log('Duration for this action is: ' + Dur);
		//push the file to our current JS object
		var fcount = theList.length + 1;
		theList.push({filename: 'image' + fcount, path: fPath, 
			cid: ccid, duration: Dur, result: rsult, comment: cmment});
		
		 /*attachments: [{
			filename: 'image.png',
			path: 'ScrnShots/2018-05-22--133257Auto2/action3.png',
			cid: 'img1', //same cid value as in the html img src
			duration: 1000s
		}]*/
		//scrnsList.push("{filename: 'image" + fcount + "', path: '" + fPath + "', cid: '" + cid + "'}");
		//scrnsList.push({filename: 'image' + fcount, path: fPath, cid: ccid});
		return "Results added to List";
	}
	catch(ex)
	{
		return Promise.reject(new Error(ex));	
	}
}

module.exports.addToList = addToList;