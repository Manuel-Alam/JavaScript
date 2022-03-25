// This module is cached as it has already been loaded
const express = require('express');
const path = require('path');
let router = express.Router();
const app = express();

app.use(express.json()); // body-parser middleware

const itemsMod = require("./items.js"); // custom catalog module
const fridgesMod = require("./fridges.js"); // custom catalog module

//Note: these paths are relative to where the router is mounted
//Since it is mounted to /students in the main app, these URLs represent the part AFTER /students

// TODO: When get /students is requested, return the entire student dataset or the index.html page
router.get("/", function(req, res, next){
	let fridges = fridgesMod.getFridges();
	let items = itemsMod.getItems();

	let both = [fridges,items];
	console.log("Inside the GET /fridges  XDDD request...");

	if(both !== undefined){
		console.log(fridges);
		res.status(200);
		res.set("Content-Type", "application/json");
		res.json(both);
	}
	else{
		res.status(500).send();
	}
});

router.get("/itemDATA", function(req, res, next){
	let items = itemsMod.getItems();

	console.log("Inside the GET /fridges  XDDD request...");

	if(items !== undefined){
		res.status(200);
		res.set("Content-Type", "application/json");
		res.json(items);
	}
	else{
		res.status(500).send();
	}
});

router.get("/:input", function(req, res, next){
	console.log("Inside the GET /fridges request...");

	//TODO: If the client requested an HTML file, then respond with the index.html file
	let id = req.params.input;

 	if(req.accepts('html')) 
	{
		res.sendFile(path.join(__dirname, '/public/'+id));
  	}
  
	// TODO: If the client requested JSON format, then response with the JSON data for all the students. To retrieve the data associated with all of the students, use the getStudents() method of the students.js module.
	// respond with json
	else if(req.accepts('json'))
	{
		let items = itemsMod.getItems();
		
			if(items !== undefined)
			{
				console.log(items);
				res.status(200).set("Content-Type", "application/json").json(items);
			}
	
			else if(items === undefined)
			{
				res.status(404).send("No items!");
			}
			else
			{
				res.status(500).send();
			}
		
  }
 });


module.exports = router;
