var file = require("fs");
const itemPath = "data/comm-fridge-items.json"
var items = [];

// intialize the application data on the server-side and save it in the ** global ** students variable
exports.initialize = function() 
{
  items = readItems();

  if(items === undefined)
  {
    console.log("ERROR: there was an error in reading the file: " + itemPath);
  }
}

exports.getItems = function(){
  return items;
}

function readItems() {
  if (file.existsSync(itemPath)) {
    return JSON.parse(file.readFileSync(itemPath));
   }
 return undefined;
}

function writeItems() {
  if(file.existsSync(itemPath)) {
    return file.writeFileSync(itemPath, JSON.stringify(items));
  }
 return undefined;
}


