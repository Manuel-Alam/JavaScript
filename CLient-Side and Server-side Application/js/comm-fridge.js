
var xhttp;
var fridges;
var items;

//this function is called when any webpage is loaded.
window.onload = function()
{

	//store the page id of the current html page a user is on.
	let pageId = document.getElementsByTagName("body")[0].id;

	//if the view_items html page is currently selected then request data for the fridges from the json
	if(pageId != null && pageId == "view_items")
	{
		requestFridgeData("http://localhost:8000/js/comm-fridge-data.json");
	}

	//if the add_items html page is currently selected then request data for the items from the json
	else if(pageId != null && pageId == "add_items")
	{
		requestItemData("http://localhost:8000/js/comm-fridge-items.json");
	}

}

//get request used to retrieve json data for fridges
function requestFridgeData(URL)
{
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = processFridgeData;
	xhttp.open('GET',URL,true);
	xhttp.send();
}

//get request used to retrieve json data for items
function requestItemData(URL)
{
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = processItemData;
	xhttp.open('GET',URL,true);
	xhttp.send();
}

//put request used to update the data of fridges in the json
function updateData(URL, data)
{
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = processData; // specify what should happen when the server sends a response
    xhttp.open("PUT", URL, true); // open a connection to the server using the GET prot

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data); // send the request to the server
}

//method used to parse from the data from the fridges json file.
function processData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
	  let data = xhttp.responseText;  // Data returned by the AJAX request
	  fridges = JSON.parse(data);  // Convert the JSON data to a JavaScript object
  
	  // print the object, so we can see the fields
	  // use the students object to populate the DOM for the table
	}
	else {
		  console.log("There was a problem with the request.");
	  }
  }

  //method usede to display the 3 fridges in the pickup item page
function processFridgeData()
{
  if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
		// JSON data returned by the AJAX request
		let data = xhttp.responseText;

		console.log(data); // print out the data to see what it looks like

		// Before we can use the data as objects, we first have to convert it into JSON objects using the parse function
		fridges = JSON.parse(data);

		displayFridges();

    	console.log(fridges);
		
	}
  else
  {
    console.log("There was a problem with the request.");
  }

}

//method used to process item data from json.
function processItemData()
{
  if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
		// JSON data returned by the AJAX request
		let data = xhttp.responseText;

		console.log(data); // print out the data to see what it looks like

		// Before we can use the data as objects, we first have to convert it into JSON objects using the parse function
		items = JSON.parse(data);

		displayItems();

    	console.log(items);

		
	}
  else
  {
    console.log("There was a problem with the request.");
  }

}

//this method will display all the fridge data for the pickup page.
function displayFridges(pageId){
	let fridgesSection = document.getElementById("fridges");
	let header = document.createElement("h1");
	header.textContent = "Available fridges";
	fridgesSection.appendChild(header);

	console.log(fridges.length);
	for(let i = 0; i < fridges.length; i++){
		let fridgeData = document.createElement("div");
		fridgeData.id = "fridge_" + i;

		let fridgeContent = "<img src='images/fridge.svg'></span>";
		fridgeContent += "<span><strong>" + fridges[i].name + "</strong></span>";
		fridgeContent	+= "<span>" + fridges[i].address.street + "</span>";
		fridgeContent += "<span>" + fridges[i].contact_phone + "</span>"

		fridgeData.innerHTML = fridgeContent;
		fridgeData.addEventListener("click", function(event){
			let fridgeID = event.currentTarget.id.split("_")[1];
			displayFridgeContents(parseInt(fridgeID));
		});

		fridgesSection.appendChild(fridgeData);
	}
}

//this method will display the content of each fridge on the pickup page.
function displayFridgeContents(fridgeID){
	document.getElementById("frigeHeading").innerHTML = "Items in the " + fridges[fridgeID].name;
	let bioInformation = "<span id='fridge_name'>" + fridges[fridgeID].name + "</span><br />" + fridges[fridgeID].address.street + "<br />" + fridges[fridgeID].contact_phone;

	document.getElementById("left-column").firstElementChild.innerHTML = bioInformation;
	document.getElementById("meter").innerHTML = "<span style='width: " + (fridges[fridgeID].capacity + 14.2)  + "%'>" + fridges[fridgeID].capacity + "%</span>";

	populateLeftMenu(fridgeID);

  let mdElements = "";
	for(const[key, value] of Object.entries(fridges[fridgeID].items)){
		mdElements += "<div id='item-" + key + "' class='item " + value.type + "'>";
		mdElements += "<img src='" + value.img + "' width='100px' height='100px'; />";
		mdElements += "<div id='item_details'>";
		mdElements += "<p>" + value.name + "</p>";
		mdElements += "<p>Quantity: <span id='qt-" + key + "'>" + value.quantity + "</span></p>";
		mdElements += "<p>Pickup item:</p>";
		mdElements += "</div></div>";
	}
	document.getElementById("middle-column").innerHTML = mdElements;
	document.getElementById("fridges").classList.add("hidden");
	document.getElementById("fridge_details").classList.remove("hidden");
}

//populates the categories and capacity bar as well as fridge information on left column of fridge data.
function populateLeftMenu(fridgeID){
	let categories = {};

	for(const[key, value] of Object.entries(fridges[fridgeID].items)){
		let type = value.type;
		if(type in categories == false){
			categories[type] = 1;
		}
		else {
			categories[type]++;
		}
	}

	let leftMenu = document.getElementById("categories");
	for (const[key, value] of Object.entries(categories)){
		let label = key.charAt(0).toUpperCase() + key.slice(1);
		let listItem = document.createElement("li");
		listItem.id = key;
		listItem.className = "category";
		listItem.textContent = label + " (" + value  + ")";

		listItem.addEventListener("click", filterMiddleView);
		leftMenu.appendChild(listItem);
	}
}

//method used to display products in each category of a fridge
function filterMiddleView(event){
	let elements = document.getElementById("middle-column").children;
	let category = event.target.id;

	for(let i = 0; i < elements.length; i++){
		let item = elements[i];
		if(!item.classList.contains(category)){
			item.classList.add("hidden");
		}
		else{
			item.classList.remove("hidden");
		}
	}
}

//function used to display all the data on the drop off page.
function displayItems()
{
	
	let select = document.getElementById("grocery_items");
	let button = document.getElementById("submit_btn");
	let number = document.getElementById("number_items");

	let form = document.getElementById("f");

	let text = document.createElement("div");
	text.className = "add_item";

	text.innerHTML = " + Add an item";

	//when the add item icon is pressed a new page will load with the input for adding a new item.
	text.onclick = function()
	{

		//create the title for the page and all the text fields.
		let title = document.getElementById("frigeHeading");
		title.textContent = "Add an Item";
		form.innerHTML = "<label for='name' class = 'txt'>Name</label> <input type = 'text' class = 'tf' name = name><br><br>";
		form.innerHTML += "<label for='type' class = 'txt'>Type</label> <input type = 'text' class = 'tf' name = type><br><br>";
		form.innerHTML += "<label for='image' class = 'txt'>Image</label> <input type = 'text' class = 'tf' name = image><br><br>";

		let results = document.getElementById("view_results");
		results.innerHTML = "";

		let button2 = document.createElement("button");
		button2.id = "submit_btn2";
		button2.textContent = "Add item";
		
		let messageDiv = document.createElement("div");
		let mainPage = document.getElementById("add_items");

		//button onlick used to add a new item to the items array and json data.
		button2.onclick = function(event)
		{
			event.preventDefault();

			messageDiv.innerHTML = "";
			document.getElementById("respArea").innerHTML = "";
			let itemsT = document.querySelectorAll("input");


			messageDiv.id = "respArea";
			messageDiv.textContent = itemsT[0].value +" was successfully added to the items list!";
			mainPage.appendChild(messageDiv);


			let URL = "http://localhost:8000/js/comm-fridge-items.json";
  			let data = "?=&name=" + itemsT[0].value;
  			data += "&type=" + itemsT[1].value;
  			data += "&img=" + itemsT[2].value;
  			
			//using post request to send data to server.
			sendData(URL,data);
		}

		form.appendChild(button2);


	}

	//for loop used to add each item as an option on the list.
	for(let item of items)
	{
		let option = document.createElement("option");
		option.textContent = item.name;
		option.value = item.name;

		select.appendChild(option);
	}


	number.addEventListener("input",checkTextField);

	//button to display the available fridges for an item
	button.onclick = displayAvailableFridges;

	form.appendChild(text);

}

//function used for error checking on the number of items text box.
function checkTextField(event)
{
  let select = document.getElementById("grocery_items");
  let element = event.target;

  if(element.id == "number_items"){
    if(isNaN(element.value) | element.value == ""){
      element.classList.add("error");
      element.classList.remove("valid");
    }
    else if(element.value > 0){
      element.classList.add("valid");
      element.classList.remove("error");
    }
  }

  if(element.classList.contains("error"))
  {
	  document.getElementById("submit_btn").disabled = true;
  }

  else if(element.classList.contains("valid") && select.value !="")
  {
	  document.getElementById("submit_btn").disabled = false;
  }
}

function displayAvailableFridges(event)
{
	event.preventDefault();
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
		{
		// JSON data returned by the AJAX request
		let data = xhttp.responseText;

		//console.log(data); // print out the data to see what it looks like

		// Before we can use the data as objects, we first have to convert it into JSON objects using the parse function
		fridges = JSON.parse(data);

    	//console.log(fridges);
		availableFridges();
		
		}
  		else
  		{
    		console.log("There was a problem with the request.");
  		}
	};

	xhttp.open('GET',"http://localhost:8000/js/comm-fridge-data.json",true);
	xhttp.send();

	
}

//function used to find the index of an item from the items array
function getItemIndex(item_name)
{
	let i = 0;

	for(let item of items)
	{
		if(item.name == item_name)
		{
			return i;
		}
		i++;
	}
}

//function used to get item object from items array.
function getItem(item_name)
{

	for(let item of items)
	{
		if(item.name == item_name)
		{
			return item;
		}
		
	}
}

//this method displays all the available fridges for an item with a specific type.
function availableFridges()
{
	let select = document.getElementById("grocery_items");
	let amount = document.getElementById("number_items");
	let availableFridgeDiv = document.getElementById("view_results");

	//array used to store available fridges
	let aFridges = [];
	availableFridgeDiv.innerHTML = "<h2>Available fridges</h2>";

	//store item object and item index in array.
	let item = getItem(select.value);
	let itemIndex = getItemIndex(select.value);
	let i = 1;

	//if a fridge meets the criteria for being available add it to the available fridge array.
	for(let fridge of fridges)
	{
		if(fridge.capacity < 100 && fridge.accepted_types.includes(item.type) && amount.value <= fridge.can_accept_items)
		{
			aFridges.push(fridge);
		}
	}

	//store the recommended fridge object.
	let recommendedFridge = findRecommendedFridge(aFridges,findItemIndexInFridge(aFridges[0].items,select.value));

	//for each fridge in the available fridges array, create the div containing all the fridge data to be displayed.
	for(let fridge of aFridges)
	{
		if(fridge.capacity < 100 && fridge.accepted_types.includes(item.type) && amount.value <= fridge.can_accept_items)
		{
			let fridgeData = document.createElement("div");
			fridgeData.id = "fridge_" + i;

			//if the current fridge name equals the recommended fridge, then highlight the current fridge.
			if(recommendedFridge.name == fridge.name)
			{
				fridgeData.classList.add("recommended");
			}

			//add all the fridge data to the div.
			let fridgeContent = "<img src='images/fridge.svg'></span>";
			fridgeContent += "<span><strong>" + fridge.name + "</strong></span>";
			fridgeContent += "<span>" + fridge.address.street + "</span>";
			fridgeContent += "<span>" + fridge.contact_phone + "</span>";
			fridgeContent += "<span>" + "Capacity: "+fridge.capacity+"%" + "</span>";
			fridgeContent += "<span>" + "Can accept # of items: "+fridge.can_accept_items + "</span>";


			fridgeData.innerHTML = fridgeContent;

			//if the fridge is clicked than the data will update in the fridge corresponding to the amount of item selected for the fridge.
			fridgeData.onclick = function()
			{

				let URL = "http://localhost:8000/js/comm-fridge-data.json";
				let amount = document.getElementById("number_items").value;
			
 				let data = "?=&name=" + fridge.name;
 		 		data += "&amount=" + amount;
  				data += "&item_name="+item.name ;
				console.log(fridge.name+" CLICKED");

				//error check to make sure amount is never greater than the number of items that can be accepted.
				if(amount <= fridge.can_accept_items)
				{
					updateData(URL,data);
				}
			}
			
			availableFridgeDiv.appendChild(fridgeData);
			i++
			 
		}

	}

	availableFridgeDiv.classList.remove("hidden");
}

//find the index of a specific item in a fridge from the items array in the fridge.
function findItemIndexInFridge(items,item_name)
{
	for(let i = 0; i < items.length;i++)
	{
		if(items[i].name == item_name)
		{
			return i;
		}
	}
}

//method used to find the recommended fridge.
function findRecommendedFridge(aFridges,itemIndex)
{
	//the lowest fridge will default to the first one.
	let min = aFridges[0];
	
	console.log(min.items[itemIndex]);

	//compare every fridge and their quantity for a specific item, and store the lowest one each time.
	for(let i = 1; i < aFridges.length;i++)
	{
		if(aFridges[i].items[itemIndex].quantity < min.items[itemIndex].quantity)
		{
			min = aFridges[i];
		}

		if(aFridges[i].items[itemIndex].quantity == min.items[itemIndex].quantity)
		{
			if(aFridges[i].capacity < min.capacity)
			{
				min = aFridges[i];
			}
		}

	}

	//return the fridge with the lowest amount of a specific item.
	return min;
}

//method used for post request to add new items to item json
function sendData(URL,data)
{
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = processDataItems; // specify what should happen when the server sends a response
 	xhttp.open("POST", URL, true); // open a connection to the server using the GET prot

  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send(data); // send the request to the server
}

//process the items from the item json.
function processDataItems()
{
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
		let data = xhttp.responseText;  // Data returned by the AJAX request
		items = JSON.parse(data);  // Convert the JSON data to a JavaScript object
	
		console.log(items); // print the object, so we can see the fields
	  }
	  else {
			console.log("There was a problem with the request.");
		}
}



















