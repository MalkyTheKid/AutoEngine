const fs = require('fs');
const dtL = require('node-datetime'); //get current date-time

async function mailIt(csname, allScrns){
try{	
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'auto.JESS.automation01@gmail.com',
		pass: ''
	  }
	});
	
	//modify, to include all images in the current case, as well as the duration
	var allImages ='';
	var masterSummary = '<table border="1"><tr><td><b>STEP</b></td><td><i>Result</i></td></tr>'; //initialize the table which will output the result
	var caseName ='';
	var totDuration = 0;
	var dtnow = dtL.create();
	dtnow = dtnow.format('Y-m-d H:M:S');
	
	//integrate all screenshots.
	for (var i in allScrns)//
	{	
		masterSummary = masterSummary + '<tr>'; //prepare the table
		//let's display the case name
		caseName = allScrns[i].cid;
		totDuration = parseFloat(totDuration) + parseFloat(allScrns[i].duration);
		//now, let's concatenate the images, both on a table and an image set.
		
		
		//if success, no change
		if (allScrns[i].result == 'success'){
					allImages = allImages + '<br> Step: <i>' + caseName + 
		'</i> <b>Completed in : ' + allScrns[i].duration + 
		' seconds</b> <p> ' + allScrns[i].comment + '</p>  Result : <b><i><font color="blue">' + allScrns[i].result + 
		'</font></b></i><br><img src="cid:' + caseName + 
		'" /> <hr />';
			
					masterSummary = masterSummary + '<td>' + caseName + '</td>' +
		'<td>' + '<b><i><font color="blue">' + allScrns[i].result + 
		'</font></b></i></td>'
		}
		else{ //it's an error
						allImages = allImages + '<br> Step: <i>' + caseName + 
		'</i> <b>Completed in : ' + allScrns[i].duration + 
		' seconds</b> <p> ' + allScrns[i].comment + '</p> <br>Result : <b><i><font color="red">' + allScrns[i].result + 
		'</font></b></i><img src="cid:' + caseName + 
		'" /> <hr />';
		
						masterSummary = masterSummary + '<td>' + caseName + '</td>' +
		'<td>' + '<b><i><font color="red">' + allScrns[i].result + 
		'</font></b></i></td>'
		}
		masterSummary = masterSummary + '</tr>'; //close the table
		
		
	}
	masterSummary = masterSummary + '</table>'; //close the main table
	
	
	
	//need a way to create the mail list. Perhaps use an external js file.
	var rawmails = fs.readFileSync('./setup/cMailerEmails.json');
	var mails = JSON.parse(rawmails);
	var mailList ='';
	for (var ii in mails)//
	{	
		//Add the emails
		mailList = mailList + mails[ii].Email + ',';
	}
	
	var fullmail = '<b>Total Duration: ' + totDuration +  
		' seconds</b> <hr /> Below are the <b>results</b> of the automation: <br /> SUMMARY:' + 
		masterSummary + '<hr />' + allImages + ' <br />';
		
	var mailOptions = {
	  from: 'auto.JESS.automation01@gmail.com',
	  to: mailList, //'malky.salvador@gmail.com, msalvador@justenergy.com', //egordon@justenergy.com
	  subject: 'The results from test case : ' + csname + ' Performed on :' + dtnow,
	  html: fullmail, 
	  //comments below are the old way I send email
	  /*html: 'Below are the <b>results</b> of the automation:<img src="cid:action1" />',
	  text : 'if you want plain text results!'
	  attachments: [{
			filename: 'image.png',
			path: 'ScrnShots/2018-05-22--133257Auto2/action3.png',
			cid: 'img1' //same cid value as in the html img src
		}]
		*/
	  attachments: allScrns
	};

	
	//comment below line if we want to send actual email	
	//return "Email would have been sent at this point"; 
	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
	
	return "mail is sent";
}
catch(ex)
	{
		return Promise.reject(new Error(ex));	
	}
}

module.exports.mailIt = mailIt;
