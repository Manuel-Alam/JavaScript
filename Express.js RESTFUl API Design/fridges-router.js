// This module is cached as it has already been loaded
const express = require('express');
const path = require('path');
let router = express.Router();
const app = express();

app.use(express.json()); // body-parser middleware

const fridgesMod = require("./fridges.js"); // custom catalog module
const itemsMod = require("./items.js"); // custom catalog module


//Note: these paths are relative to where the router is mounted
//Since it is mounted to /students in the main app, these URLs represent the part AFTER /students

// TODO: When get /students is requested, return the entire student dataset or the index.html page
router.get("/", function(req, res, next){

	if(req.accepts('html')) 
	{	
		res.sendFile(path.join(__dirname, '/public/'+"index.html"));

  	}

	  else if(req.accepts("json"))
	  {
		  let fridges = fridgesMod.getFridges();
  
		  console.log("Inside the GET /  XDDD request...");
  
		  if(fridges !== undefined){
		  console.log(fridges);
		  res.status(200);
		  res.set("Content-Type", "application/json");
		  res.json(fridges);
		  }
		  else{
			  res.status(500).send();
		  }
	  }
	
});

router.get("/fridges", function(req, res, next){

	if(req.accepts('html')) 
	{	
		res.sendFile(path.join(__dirname, '/public/'+"view_pickup.html"));

  	}

	  else if(req.accepts("json"))
	  {
		  let fridges = fridgesMod.getFridges();
  
		  console.log("Inside the GET /  XDDD request...");
  
		  if(fridges !== undefined){
		  console.log(fridges);
		  res.status(200);
		  res.set("Content-Type", "application/json");
		  res.json(fridges);
		  }
		  else{
			  res.status(500).send();
		  }
	  }
	
	
});

router.get("/fridges/addFridge.html", function(req, res, next){

	if(req.accepts('html')) 
	{	
		res.sendFile(path.join(__dirname, '/public/'+"addFridge.html"));

  	}
	
});

router.get("/fridges/editFridge.html", function(req, res, next){

	if(req.accepts('html')) 
	{	
		res.sendFile(path.join(__dirname, '/public/'+"editFridge.html"));

  	}
	
});



router.post("/fridges",express.json(), function(req, res, next){

	console.log(req.body);
	
	
	let name = req.body.name;
	let can_accept_items = req.body.can_accept_items;
	let accepted_types = req.body.accepted_types;
	let contact_person = req.body.contact_person;
	let contact_phone = req.body.contact_phone;
	let address = req.body.address;
	if(name === undefined || can_accept_items === undefined || accepted_types === undefined ||contact_person === undefined||contact_phone=== undefined|| address === undefined)
	{
		res.status(400).send("The fridge entered in the body is bad.");
	}
	else 
	{
		let result = fridgesMod.addFridge(req.body)

		if(result === undefined)
		{ // category does not exist
			res.status(404).send("error making fridge");
		}

		else if (result !== undefined)
		{ // category is successfully updated
			res.status(200).set("Content-Type", "application/json").json(result);
		}

		else
		{
			res.status(500).send();
		}
	}
	 
	
	
});

router.get("/fridges/:fridgeID", function(req, res, next){

	if(req.accepts('json')) 
	{	let id = req.params.fridgeID;
		let fridges = fridgesMod.findFridge(id);
    
		  if(fridges !== undefined)
		  {
		  	console.log(fridges);
		 	 res.status(200);
		  	res.set("Content-Type", "application/json");
		  	res.json(fridges);
		  }

		  else if(fridges === undefined)
		  {
			res.status(404).send("Fridge id doesn't exist.");
		  }
		  else{
			  res.status(500).send();
		  }

  	}
	
});

router.put("/fridges/:fridgeID",express.json(), function(req, res, next){

	console.log(req.body);
	console.log("INSIDE PUTT");
	
	let fridgeID = req.params.fridgeID;
	let name = req.body.name;
	let can_accept_items = req.body.can_accept_items;
	let accepted_types = req.body.accepted_types;
	let contact_person = req.body.contact_person;
	let contact_phone = req.body.contact_phone;
	let address = req.body.address;

	if(address === undefined||fridgeID === undefined||can_accept_items=== undefined || name === undefined || accepted_types === undefined ||contact_person === undefined||contact_phone=== undefined)
	{
		console.log("BADADD");
		res.status(400).send("The fridge entered in the body is bad.");
	}
	else 
	{
		let result = fridgesMod.updateFridge(fridgeID,req.body);

		if(result === undefined)
		{ // category does not exist
			res.status(404).send("Fridge doesn't exist.");
		}

		else if (result !== undefined)
		{ // category is successfully updated
			res.status(200).set("Content-Type", "application/json").json(result);
		}

		else
		{
			res.status(500).send();
		}
	}
	 
	
	
});

router.post("/fridges/:fridgeID/items",express.json(), function(req, res, next){

	console.log(req.body);
	
	let fridgeID = req.params.fridgeID;

	let id = req.body.id;
	let quantity = req.body.quantity;
	
	if(id === undefined || quantity === undefined)
	{
		res.status(400).send("The fridge entered in the body is bad.");
	}
	else 
	{
		let result = fridgesMod.addItemToFridge(fridgeID,req.body);

		if(result === undefined)
		{ // category does not exist
			res.status(404).send("fridgeID dont exist. or ItemId already exist");
		}

		else if (result !== undefined)
		{ // category is successfully updated
			res.status(200).set("Content-Type", "application/json").json(result);
		}

		else
		{
			res.status(500).send();
		}
	}
	 
});

router.delete("/fridges/:fridgeID/items/", express.json(), function(req, res, next){
	console.log("WADDDAP");
	
	let query = req.query;
	let fridgeID = req.params.fridgeID;
	if(fridgeID === undefined)
	{
		res.status(400).send("The fridgeID entered is bad.");
	}

	else
	{
		// If a query string was provided, then we will only delete items in the category that were specified in the query string. These items will only be deleted if valid items were provided in the query string
		let result = "";
		let i = 0;
		
		for(let j = 0; j < 2;j++)
		{
			for(let param in query)
			{
				result = fridgesMod.deleteItem(fridgeID,query[param][j].toString());
				if(result === undefined)
				{
					break;
				}
			}
			
		}
		/*
		for(let param in query)
		{
			result = fridgesMod.deleteItem(fridgeID,query[param][i].toString());
			if(result === undefined)
			{
				break;
			}

			i++;
		}*/
		// iterate over all of the query string elements (i.e., item ids)
		
		// if any of the items specified in the query string do not exist, then return a 404 error
		if(result === undefined){ // item does not exist
			res.status(204).send("The item id does not exist");
		}
		else{ // items successfully deleted
			// if all of the items specified in the query string were deleted, then return a 200 code
			res.status(200).send("The items were successfully deleted.");
		}
	}
	
	
});

router.delete("/fridges/:fridgeID/:itemID", express.json(), function(req, res, next){
	console.log(req.body);
	
	let fridgeID = req.params.fridgeID;
	let itemID = req.params.itemID;
	
	if(fridgeID === undefined || itemID === undefined)
	{
		res.status(400).send("The fridgeID or itemID entered is bad.");
	}
	else 
	{
		let result = fridgesMod.deleteItem(fridgeID,itemID);

		if(result === undefined)
		{ // category does not exist
			res.status(404).send("itemId or FridgeId dont exist.");
		}

		else if (result !== undefined)
		{ // category is successfully updated
			res.status(200).set("Content-Type", "application/json").json(result);
		}

		else
		{
			res.status(500).send();
		}
	}
});





module.exports = router;
