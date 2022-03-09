const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the fs (file system) module so that we read and write data to files

var fridges;
var items;

const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

const server = http.createServer(processRequest);// create the server object

server.listen(port, host, () => { // Bind the port and host to the server
  console.log("Server is running!");
});

// process a request received, prepare and send a response back to the client
function processRequest(request, response)
{
  //const urlObject = url.parse(request.url, true); // parses the URL into readable parts
  //console.log(urlObject);
  let queryObject = url.parse(request.url, true);

  if(request.method === "POST")
  {
    let data = "";

    request.on('data', chunk => {
        data += chunk.toString();
    });
    request.on('end', () => {
        queryObject = url.parse(data, true);
        //console.log(data);
        //console.log(queryObject);

        // create a new student object
        
        let newitem = {
          name: queryObject.query.name,
          type: queryObject.query.type,
          img: queryObject.query.img,
      
        };

        // add the new student object to the students array
        items.push(newitem);   
        console.log(items);   

        // write the new object to the students.json file to save the data
        // send the new data back to the client
        file.writeFile("js/comm-fridge-items.json", JSON.stringify(items), function (writeError) {
          if (writeError){
            console.log("There was an error writing to the students.json file.");
            throw err;
          }
          else {
            // read contents from the file again
            file.readFile('js/comm-fridge-items.json', function(err, contents) {
        			if(err){
        				response.writeHead(500, {"Content-Type": "application/javascript"});
        				response.end();
        				return;
        			}
        			response.writeHead(200, {"Content-Type": "application/javascript"});
        			response.end(contents);
        		});
            
          }
        });
    });
  }

  //put method used to update data in fridge json
  else if(request.method === "PUT"){
    let data = "";

    request.on('data', chunk => {
      data += chunk.toString();
    });
    request.on('end', chunk => {
      urlObject = url.parse(data, true);

      let index = 0;

      //for loop to find where the selected item is located in items array.
      for(let k = 0; k < fridges.length;k++)
      {
        for(let j = 0; j < fridges[k].items.length;j++)
        {
          if(fridges[k].items[j].name == urlObject.query.item_name)
          {
            index = j;
            break;
          }
        }
      }
      //for loop used to find matching fridge and update it's data
      for(let i = 0; i < fridges.length; i++)
      {
        if(fridges[i].name == urlObject.query.name)
        {
          fridges[i].items[i].quantity+=urlObject.query.amount;
          fridges[i].num_items_accepted+=urlObject.query.amount;
          fridges[i].can_accept_items-=urlObject.query.amount;

          break;
        }
      }
      console.log(urlObject.query.name);
      console.log(urlObject.query.amount);
      console.log(urlObject.query.item_name);
      
      
      //write and read the json file with the updated data.
      file.writeFile('js/comm-fridge-data.json', JSON.stringify(fridges), function(writeError){
        if(writeError){
          console.log("Error when writing to the comm-fridge.json file!");
          throw err;
        }
        else{
          file.readFile('js/comm-fridge-data.json', 'utf-8', function(err, contents){
            if(err){
              response.writeHead(500, {"Content-Type": "application/javascript"});
              response.end();
              return;
            }
            response.writeHead(200, {"Content-Type": "application/javascript"} );
            response.end(contents);
          });
        }
      });
      

    });

  }

  //this request method will retrieve all the json type files.
  else if(request.url.indexOf(".json") > -1)
  {

    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"application/json"});
        response.end();
        return;
      }

      //if the json file is for the fridge data, then store it in the friges array
      if(location == "js/comm-fridge-data.json")
      {
        fridges = JSON.parse(contents);
      }

      //if the json file is for the item data, then store it in th eitems array.
      if(location == "js/comm-fridge-items.json")
      {
        items = JSON.parse(contents);
      }

      response.writeHead(200,{"Content-Type":"application/json"});
      response.end(contents);
    });

  }

  //this request method will retrieve all the .html type files.
  else if(request.url.indexOf(".html") > -1)
  {
    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"text/html"});
        response.end();
        return;
      }

      response.writeHead(200,{"Content-Type":"text/html"});
      response.end(contents);
    });

  }

  //this request method will retrieve all the css type files.
  else if(request.url.indexOf(".css") > -1)
  {
    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"text/css"});
        response.end();
        return;
      }

      response.writeHead(200,{"Content-Type":"text/css"});
      response.end(contents);
    });

  }

    //this request method will retrieve all the js type files.
  else if(request.url.indexOf(".js") > -1)
  {
    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"application/javascript"});
        response.end();
        return;
      }

      response.writeHead(200,{"Content-Type":"application/javascript"});
      response.end(contents);
    });

  }

  //this request method will retrieve all the jpeg type files.
  else if(request.url.indexOf(".jpeg") > -1)
  {
    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"image/jpeg"});
        response.end();
        return;
      }

      response.writeHead(200,{"Content-Type":"image/jpeg"});
      response.end(contents);
    });

  }

    //this request method will retrieve all the svg type files.
  else if(request.url.indexOf(".svg") > -1)
  {
    let location = request.url;
    location = location.substr(1);

    file.readFile(location,function(err,contents)
    {
      if(err)
      {
        response.writeHead(500,{"Content-Type":"image/svg+xml"});
        response.end();
        return;
      }

      response.writeHead(200,{"Content-Type":"image/svg+xml"});
      response.end(contents);
    });

  }

  

  

}

// run the server: node server.js
// if you make a change to your server code, you must restart the server
