//how to begin:
//install express in nodejs: "npm install express"

var express = require('express'); 
var app=express(); //create an object from the express module
var path = require('path');

//Em's birthday url : https://codepen.io/anon/pen/XxORem
//lessons with node webserver express: https://www.guru99.com/node-js-express.html

//basefile which manages our calls 
var exJSfile = require('./begin_test.js');

//default route
app.get('/', function(req, res) { 
	res.send('Hello World!'); 
});





/*Sample Calls for reference*/
//route for Command1 
app.get('/cmd1', function(req,res)
{
    res.send("<b> Command 1</b> initiated.");
});


//route for Command2
app.get('/cmd2', function(req,res)
{
    res.send("<b> Command 2</b> initiated.");
});


//route for a JSON response
app.get('/samplejson', function(req,res)
{
	var sampleJSON = {"Information": 
		{
			  "ThirdPartyId": "IP20042700",
			  "RequestDate": "2018-10-24T10:33:12.76-04:00",
			  "Status": "Verified",
			  "DivisionCode": "HES_PJM_IL"
	   },
			  "SellingAgent": {
			  "FirstName": "Malcolm",
			  "LastName": "Salvador",
			  "AgentId": "335049"
	   }
   }
    res.send(sampleJSON);
});



//route for a response (in this case, JSON) from a different source.
//synchronous
app.get('/triggerAnotherPage', function(req,res)
{
	//exJSfile required above will call the JS file and respond here
    var response1 = exJSfile.testResponse1();
	console.log(response1);
	 res.setHeader('Content-Type', 'application/json');
	res.send(response1); //async ruins this...
	
	//this example is static. what if asyc?
});

//route for a response, 
//asynchronous
app.get('/triggerPageAsync/msg/:theText/:theText2', function(req,res)
{
		//exJSfile required above will call the JS file and respond here
		var userVal = req.params.theText2; //it's from the url we are getting from the user above
		console.log(userVal);
		
		// non callback approach
		
		//var response2 = await getForResponse2(userVal);
		exJSfile.testResponse2(userVal)
		.then(respo => {
			
			console.log(respo);
			res.setHeader('Content-Type', 
			  'application/json');
			  
			res.send(respo);
		});
		 
		
		
		//let's use a callback approach
		
});



//route for a website (this page must be on the same location as our files.)
app.get('/myPage', function(req,res)
{
    //res.send("/website/index.html");
	/*
	var siteDir = __dirname + '\\';
	console.log(siteDir);
	res.sendFile('\index.html', {root: siteDir })
	res.sendFile('index.html', 
	{ root: path.join(__dirname, '/website') });
	*/
	//use the "website" directory
	app.use(express.static('Happy-Birthday-master'));
	//then send the file!
	res.setHeader('Content-Type', 'text/html');
	res.sendFile('index.html',
	{ root: path.join(__dirname, '/Happy-Birthday-master') });
	
});

app.get('/happyBirthdayVivien', function(req,res)
{
    //res.send("/website/index.html");
	/*
	var siteDir = __dirname + '\\';
	console.log(siteDir);
	res.sendFile('\index.html', {root: siteDir })
	res.sendFile('index.html', 
	{ root: path.join(__dirname, '/website') });
	*/
	//use the "website" directory
	app.use(express.static('Happy-Birthday-master'));
	//then send the file!
	res.setHeader('Content-Type', 'text/html');
	res.sendFile('index.html',
	{ root: path.join(__dirname, '/Happy-Birthday-master') });
	
});

app.get('/myMain', function(req,res)
{
    //res.send("/website/index.html");
	/*
	var siteDir = __dirname + '\\';
	console.log(siteDir);
	res.sendFile('\index.html', {root: siteDir })
	res.sendFile('index.html', 
	{ root: path.join(__dirname, '/website') });
	*/
	//use the "website" directory
	app.use(express.static('website-main'));
	//then send the file!
	res.setHeader('Content-Type', 'text/html');
	res.sendFile('index.html',
	{ root: path.join(__dirname, '/website-main') });
	
});

// POST method route example
app.post('/', function (req, res) {
  res.send('POST request to the homepage has been sent')
});

//accepts all requests (GET, POST, PUT, DELETE)
app.all('/secret', function (req, res, next) {
  res.send('Accessing the secret section ...');
  //console.log('Accessing the secret section ...');  
  next(); // pass control to the next handler
});

//This route path will accept /abe and /abcde. (for those projects that require two paths that are essentially the same)
app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})


//this route will accept parameters: 
/*
	for example, see below
	Route path: /account/:userId/owner/:ownerString
	Request URL: http://localhost:3000/account/4863/owner/MSalvador
	result req.params: { "account": "4863", "owner": "MSalvador" }
	
*/

app.get('/account/:userId/owner/:ownerString', function (req, res) {
  res.send(req.params);
  //you can send these params to another page that will accept it.
});



var server = app.listen(3001, function(){}); //when we access localhost:3001, the above will be the response
