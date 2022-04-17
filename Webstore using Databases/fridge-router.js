// This module is cached as it has already been loaded
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
let router = express.Router();

let Fridge = require("./models/fridgeModel");
const ItemModel = require('./models/itemModel');
let typeModel = require('./models/typeModel');

app.use(express.json()); // body-parser middleware

// Get /fridges and return the all of the fridges based on requested format
router.get('/', (req,res)=> {
    res.format({
		'text/html': ()=> {
			res.set('Content-Type', 'text/html');
			res.sendFile(path.join(__dirname,'public','view_pickup.html'),(err) =>{
				if(err) res.status(500).send('500 Server error');
			});
		},
		'application/json': ()=> {
			res.set('Content-Type', 'application/json');
			Fridge.find(function(err, results){
				
				if(results !== undefined)
				{
					res.status(200);
					res.json(results);
				}

				if(results == undefined)
				{
					res.status(404).send("No fridges found.");
				}
				
				
			});
			
        },
        'default' : ()=> {
            res.status(406).send('Not acceptable');
        }
    })
});
// helper route, which returns the accepted types currently available in our application. This is used by the addFridge.html page
router.get("/types", function(req, res, next){
	let types = [];
  Object.entries(req.app.locals.items).forEach(([key, value]) => {
    if(!types.includes(value["type"])){
      types.push(value["type"]);
    }
  });
	res.status(200).set("Content-Type", "application/json").json(types);
});

// Middleware function: this function validates the contents of the request body associated with adding a new fridge into the application. At the minimimum, it currently validates that all the required fields for a new fridge are provided.
function validateFridgeBody(req,res,next){
    let properties = ['id','name','canAcceptItems','acceptedTypes','address','contactInfo'];

    for(property of properties){
      // hasOwnProperty method of an object checks if a specified property exists in the object. If a property does not exist, then we return a 400 bad request error
        if (!req.body.hasOwnProperty(property)){
			console.log(property);
            return res.status(400).send("Bad request");
        }
    }
    // if all the required properties were provided, then we move to the next set of middleware and continue program execution.
    next();
}
// Middleware function: this validates the contents of request body, verifies item data
function validateItemBody(req,res,next){
    let properties = ['id','quantity'];
    for (property of properties){
        if (!req.body.hasOwnProperty(property))
			return res.status(400).send("Bad request");
    }
    next();
}
// Adds a new fridge, returns newly created fridge
router.post('/', validateFridgeBody, (req,res)=> {
	// Make local changes

	Fridge.find(function(err, results)
	{	
		let newFridge = new Fridge(req.body);
		let length = results.length+1;
		newFridge.id = "fg-"+length;
		
		newFridge.save(function(err)
		{
			if(err)
			{
				return res.status(400).send("Bad Body.");
			};
			
			console.log("Saved new fridge.");
			res.status(200).set("Content-Type", "application/json").json(req.body);
		});
		
	});
	
});

// Get /fridges/{fridgeID}. Returns the data associated with the requested fridge.
router.get("/:fridgeId", function(req, res, next){

	Fridge.find(function(err, results){
				
	let fridge;

	for(let i =0; i < results.length;i++)
	{
		if(results[i].id == req.params.fridgeId)
		{
			fridge = results[i];
		}
	}

	if(fridge!== undefined)
	{
		res.status(200);
		res.json(fridge);	
		
	}

	if(fridge == undefined)
	{
		res.status(404).send("fridgeID does not exist.");
	}
	});

});

// Updates a fridge and returns the data associated.
// Should probably also validate the item data if any is sent, oh well :)
router.put("/:fridgeId",validateFridgeBody, (req, res) =>{

	Fridge.find(function(err, results)
	{
		let fridge;

		for(let i = 0;i < results.length;i++)
		{
			if(results[i].id == req.params.fridgeId)
			{
				fridge = results[i];
			}
		}

		if(fridge == undefined)
		{
			res.status(400).send("FridgeID doesn't exist.");
		}

		if(fridge !== undefined)
		{
			fridge.id= req.body.id;
			fridge.name = req.body.name;
			fridge.contactInfo= req.body.contactInfo;
			fridge.address= req.body.address;
			fridge.acceptedTypes= req.body.acceptedTypes;
			fridge.canAcceptItems = req.body.canAcceptItems;

			fridge.save(function(err)
			{
				if(err)
				{
					res.status(400).send("Bad Body.");
				};
				
				console.log("Updated fridge.");
				res.status(200).set("Content-Type", "application/json").json(req.body);
			});
			
		}
		
	});

});

// Adds an item to specified fridge
router.post("/:fridgeId/items", validateItemBody, (req,res)=>{

	Fridge.find(function(err, results)
	{
		let fridge;

		for(let i = 0;i < results.length;i++)
		{
			if(results[i].id == req.params.fridgeId)
			{
				fridge = results[i];
			}
		}

		if(fridge == undefined)
		{
			res.status(400).send("FridgeID doesn't exist.");
		}

		if(fridge !== undefined)
		{
			let item;

			for(let j = 0; j < fridge.items.length;j++)
			{	
				if(fridge.items[j].id == req.body.id)
				{
					item = fridge.items[j];
				}
			}

			if(item == undefined)
			{
				fridge.items.push(req.body);

				fridge.save(function(err){
				if(err)
				{
					res.status(400).send("Bad Body.");
				};
				
				console.log("Saved new item.");
				res.status(200).set("Content-Type", "application/json").json(req.body);
				});
			}
			else
			{
				res.status(409).send("Item ID already exist.");
			}
			
		}
		
	});

})

// Deletes an item from specified fridge
router.delete("/:fridgeId/items/:itemId", (req,res)=>{

	Fridge.find(function(err, results)
	{
		let fridge;

		for(let i = 0;i < results.length;i++)
		{
			if(results[i].id == req.params.fridgeId)
			{
				fridge = results[i];
			}
		}

		if(fridge == undefined)
		{
			res.status(404).send("FridgeID doesn't exist.");
		}

		if(fridge !== undefined)
		{
			let item;
			let index;
			for(let j = 0; j < fridge.items.length;j++)
			{	
				if(fridge.items[j].id == req.params.itemId)
				{
					item = fridge.items[j];
					index = j
				}
			}

			if(item != undefined)
			{
				fridge.items.splice(index,1);

				fridge.save(function(err){
				if(err)
				{
					res.status(400).send("Bad Body.");
				};
				
				console.log("Deleted item id = "+req.params.itemId);
				res.status(200).set("Content-Type", "application/json").json(item);
				});
			}
			else
			{
				res.status(404).send("Item ID doesn't exist.");
			}
			
		}
		
	});

})

router.delete("/:fridgeId/items", (req,res)=>{

	let query = req.query;
	console.log(query.item);
	if(query.item == undefined)
	{
		Fridge.find(function(err, results)
		{
			let fridge;

			for(let i = 0;i < results.length;i++)
			{
				if(results[i].id == req.params.fridgeId)
				{
					fridge = results[i];
				}
			}

			if(fridge == undefined)
			{
				res.status(404).send("FridgeID doesn't exist.");
			}

			if(fridge !== undefined)
			{
				fridge.items = [];

				fridge.save(function(err){
					if(err)
					{
						res.status(400).send("Bad request.");
					};
					
					res.status(200).set("Content-Type", "application/json").json(fridge.items);
					});
			}
		});
	}

	else
	{
		Fridge.find(function(err, results)
		{
			let fridge;

			for(let i = 0;i < results.length;i++)
			{
				if(results[i].id == req.params.fridgeId)
				{
					fridge = results[i];
				}
			}

			if(fridge == undefined)
			{
				res.status(404).send("FridgeID doesn't exist.");
			}

			if(fridge !== undefined)
			{
				let items = [];
				let index = [];
				for(let j = 0; j < fridge.items.length;j++)
				{	
					for(let k = 0; k < query.item.length;k++)
					{
						if(fridge.items[j].id == query.item[k])
						{
							index.push(j);
							items.push(fridge.items[j]);
						}
					}
				}

				if(items.length > 0)
				{	
					for(let i = index.length-1; i >= 0;i--)
					{
						console.log(index[i]);
						fridge.items.splice(index[i],1);
						
					}

					fridge.save(function(err){
					if(err)
					{
						res.status(400).send("Bad Body.");
					};
					
					res.status(200).set("Content-Type", "application/json").json(items);
					});
				}
				else
				{
					res.status(404).send("Item ID doesn't exist.");
				}
			
		}
		
	});
	}

})


router.put("/:fridgeID/items/:itemID", (req,res)=>{

	console.log("WADDAP");

	Fridge.find(function(err, results)
	{
		let fridge;

		for(let i = 0;i < results.length;i++)
		{
			if(results[i].id == req.params.fridgeID)
			{
				fridge = results[i];
			}
		}

		if(fridge == undefined)
		{
			res.status(404).send("FridgeID doesn't exist.");
		}

		if(fridge !== undefined)
		{
			let item;
			for(let j = 0; j < fridge.items.length;j++)
			{	
				if(fridge.items[j].id == req.params.itemID)
				{
					item = fridge.items[j];
				}
			}

			if(item != undefined)
			{
				item.quantity = req.body.quantity;

				fridge.save(function(err){
				if(err)
				{
					res.status(400).send("Bad Body.");
				};
				
				res.status(200).set("Content-Type", "application/json").json(item);
				});
			}
			else
			{
				res.status(404).send("Item ID doesn't exist.");
			}
			
		}
		
	});
})

router.post("/items", (req,res)=>{

	console.log("DDDD");

	ItemModel.find(function(err, results)
	{
		let item;

		for(let i = 0; i < results.length;i++)
		{
			if(results[i].name == req.body.name)
			{
				item = results[i];
			}
		}

		if(item == undefined)
		{
			req.body.id = results.length+1;
			let newItem = new ItemModel(req.body);

			newItem.save(function(err)
			{
				if(err)
				{	
					console.log(err);
					return res.status(400).send("Bad Body.");
				};
			
				console.log("Saved new Item.");
				res.status(200).set("Content-Type", "application/json").json(req.body);
			});
			
		}

		if(item !== undefined)
		{
			res.status(409).send("Item name already exist.");
		}
		
	});
	
})

router.get("/search/items", (req,res)=>{
	
	typeModel.find(function(err, types)
	{
		ItemModel.find(function(err, items)
		{
			let query = req.query;
			console.log(query);

			if(query == undefined || query.name == ''||query.type == '')
			{
				return res.status(400).send("Improperly formatted query");
			}

			for(let i = 0; i< items.length;i++)
			{
				for(let j = 0; j < types.length;j++)
				{
					if(items[i].type == types[j].id)
					{
						items[i].type = types[j].name;
					}
				}
			}

			let list = [];

			for(let i = 0; i< items.length;i++)
			{	
				if(items[i].type.includes(query.type) && items[i].name.includes(query.name))
				{
					list.push(items[i]);
				}
			}

			if(list !== undefined)
			{
				res.status(200).json(list);
			}

			else
			{
				res.status(400).send("No such names exist.");
			}
		
		});
		
	});

	
})

module.exports = router;
