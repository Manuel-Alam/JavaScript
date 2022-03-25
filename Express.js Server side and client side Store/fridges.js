var file = require("fs");
const fridgePath = "data/comm-fridge-data.json";
const itemPath = "data/comm-fridge-items.json"
var fridges = [];
var items = [];
var both = [];

// intialize the application data on the server-side and save it in the ** global ** students variable
exports.initialize = function() 
{
  fridges = readFridges();
  items = readItems();

  if(fridges === undefined)
  {
    console.log("ERROR: there was an error in reading the file: " + fridgePath);
  }

  if(items === undefined)
  {
    console.log("ERROR: there was an error in reading the file: " + itemPath);
  }
}
// return the list of students
exports.getFridges = function() {
  return readFridges();
}

exports.getItems = function(){
  return readItems();
}

exports.getBoth = function()
{
  both.push(fridges);
  both.push(items);

  return both;
}

exports.addFridge = function(data)
{
  let fridgez = readFridges();

  let fridge = {
    id: "",
	  name:"",
	  num_items_accepted: 0,
	  can_accept_items: 0,
	  accepted_types: [],
	  contact_person: "",
	  contact_phone: "",

	address:{
		street:"",
		postal_code:"",
		city:"",
		province:"",
		country:""
	},

	items:[]
  };

  let id = fridgez.length+1;

  fridge.name = data.name;
  fridge.can_accept_items = data.can_accept_items;
  fridge.accepted_types = data.accepted_types;
  fridge.num_items_accepted = 0;
  fridge.contact_person = data.contact_person;
  fridge.contact_phone = data.contact_phone;
  fridge.address = data.address;
  fridge.address.country = "Canada";
  fridge.id = "fg-"+id.toString();
  fridge.items = [];

  fridgez.push(fridge);

  let result = writeFridges(fridgez);

  return fridge;

}

exports.findFridge = function(fridgeID)
{
  let fridgez = readFridges();

  let fridge = fridgez.find(
    function findCategory(f) {
        return f.id === fridgeID;
    }
  );

  if(fridge!== undefined)
  {
    return fridge;
  }

  return undefined;

}

exports.updateFridge = function(fridgeID, data)
{
  let fridgez = readFridges();

  let fridge = fridgez.find(
    function findCategory(f) {
        return f.id === fridgeID;
    }
  );
  // if the student exists, then let's update the information for the student
  if(fridge !== undefined){
    fridge.name = data.name;
    fridge.accepted_types = data.accepted_types;
    fridge.num_items_accepted = data.num_items_accepted;
    fridge.contact_person = data.contact_person;
    fridge.contact_phone = data.contact_phone;
    fridge.address = data.address;

    let result = writeFridges(fridgez);
    return fridge;
  }
  return undefined;
}

exports.addItemToFridge = function(fridgeID,data)
{
  let newItem = {"id": "", "quantity":0};

  newItem.id = data.id;
  newItem.quantity = data.quantity;

  let fridgez = readFridges();

  let fridge = fridgez.find(
    function findCategory(f) {
        return f.id === fridgeID;
    }
  );

  let item = fridge.items.find(
    function findCategory(i) {
        return i.id === data.id;
    }
  );

  if(item!== undefined)
  {
    return undefined;
  }

  if(fridge!== undefined)
  {
    fridge.items.push(newItem);

    let result = writeFridges(fridgez);

    return newItem;
  }

  return undefined;
}

exports.deleteItem = function(fridgeID,itemID)
{
  let fridgez = readFridges();

  let fridge = fridgez.find(
    function findFridge(f) {
        return f.id === fridgeID;
    }
  );

  if(fridge!== undefined)
  {
    let item = fridge.items.find(
      function finditem(i) {
          return i.id === itemID;
      }
    );

    if(item!==undefined)
    {
      for(let i = 0; i < fridge.items.length;i++)
      {
        if(fridge.items[i].id == itemID)
        {
          fridge.items.splice(i,1);
          let result = writeFridges(fridgez);
          return "";
        }
      }
    }
  }

  return undefined;
}

// reads the entire students.json file and returns the data from the file if the read method was successful
function readFridges() {
   if (file.existsSync(fridgePath)) {
     return JSON.parse(file.readFileSync(fridgePath));
    }
  return undefined;
}

function readItems() {
  if (file.existsSync(itemPath)) {
    return JSON.parse(file.readFileSync(itemPath));
   }
 return undefined;
}

// write students from memory to the students.json file
function writeFridges(fridgez) {
   if(file.existsSync(fridgePath)) {
     return file.writeFileSync(fridgePath, JSON.stringify(fridgez));
   }
  return undefined;
}

function writeItems() {
  if(file.existsSync(itemPath)) {
    return file.writeFileSync(itemPath, JSON.stringify(items));
  }
 return undefined;
}




