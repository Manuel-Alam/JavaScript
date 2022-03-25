window.onload = function(){
	let pageId = document.getElementsByTagName("body")[0].id;
	if(pageId != null && pageId == "view_items"){
		retrieveFridgeData();
	}

	else if(pageId != null && pageId == "add_fridge"){
		rItemData();
	}

	else if(pageId != null && pageId == "edit_fridge"){
		reItemData();

	}
	
}
function displayEditFridges(items,fridgeID)
{
	console.log(fridgeID);
	let select = document.getElementById("accepted_types");
	let types = [];

	for(let item in items)
	{
		if(!types.includes(items[item].type))
		{
			types.push(items[item].type);
		}
	}

	console.log(types);

	for(let type of types)
	{
		let option = document.createElement("option");
		option.textContent = type;
		option.value = type;

		select.appendChild(option);
	}
	let itemsT = document.querySelectorAll("input");
	let btn = document.getElementById("btnSubmit");
	btn.onclick = function(event)
	{
		event.preventDefault();
		
		let data = {"name": itemsT[0].value, "can_accept_items": itemsT[1].value, "accepted_types": [select.value], "contact_person": itemsT[2].value,"contact_phone": itemsT[3].value,"address": {"street": itemsT[4].value,"postal_code": itemsT[5].value,"city": itemsT[6].value, "province": itemsT[7].value}};
		let URL = "http://localhost:8000/fridges/"+fridgeID;
		updateData(URL,data);
		
	}

}

function updateData(URL,data)
{
	console.log("UPDATING DATA");
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = processDataU; // specify what should happen when the server sends a response
 	xhttp.open("PUT", URL, true); // open a connection to the server using the GET prot

  	xhttp.setRequestHeader("Content-type", "application/json");

	let d = JSON.stringify(data);
  	xhttp.send(d); // send the request to the server
}

//process the items from the item json.
function processDataU()
{
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
		let data = xhttp.responseText;  // Data returned by the AJAX request
		let items = JSON.parse(data);  // Convert the JSON data to a JavaScript object
	
		console.log(items); // print the object, so we can see the fields
	  }
	  else {
			console.log("There was a problem with the request.");
		}
}
function displayAddFridges(items)
{
	
	console.log("YUPPP");
	let select = document.getElementById("accepted_types");
	let types = [];

	for(let item in items)
	{
		if(!types.includes(items[item].type))
		{
			types.push(items[item].type);
		}
	}

	console.log(types);

	for(let type of types)
	{
		let option = document.createElement("option");
		option.textContent = type;
		option.value = type;

		select.appendChild(option);
	}
	let itemsT = document.querySelectorAll("input");
	let btn = document.getElementById("btnSubmit");
	btn.onclick = function(event)
	{
		event.preventDefault();
		
		let data = {"name": itemsT[0].value, "can_accept_items": itemsT[1].value, "accepted_types": [select.value], "contact_person": itemsT[2].value,"contact_phone": itemsT[3].value,"address": {"street": itemsT[4].value,"postal_code": itemsT[5].value,"city": itemsT[6].value, "province": itemsT[7].value}};
		let URL = "http://localhost:8000/fridges";
		sendData(URL,data);
		/*
			let URL = "http://localhost:8000/fridges";
  			let data = "?=&name=" + itemsT[0].value;
  			data += "&type=" + itemsT[1].value;
  			data += "&img=" + itemsT[2].value;
  			
			//using post request to send data to server.
			sendData(URL,data);
		*/
	}

}

function sendData(URL,data)
{
	console.log("SENDING DATA");
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
	xhttp.onreadystatechange = processDataItems; // specify what should happen when the server sends a response
 	xhttp.open("POST", URL, true); // open a connection to the server using the GET prot

  	xhttp.setRequestHeader("Content-type", "application/json");

	let d = JSON.stringify(data);
  	xhttp.send(d); // send the request to the server
}

//process the items from the item json.
function processDataItems()
{
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
		let data = xhttp.responseText;  // Data returned by the AJAX request
		let items = JSON.parse(data);  // Convert the JSON data to a JavaScript object
	
		console.log(items); // print the object, so we can see the fields
	  }
	  else {
			console.log("There was a problem with the request.");
		}
}
function displayFridges(fridges,items){
	console.log(fridges);
	let fridgesSection = document.getElementById("fridges");
	let header = document.createElement("h1");
	header.textContent = "Available fridges";

	let addFridge = document.createElement("Button");
	addFridge.textContent = "Add a fridge";
	addFridge.className = "addFridgeB";
	addFridge.addEventListener("click",function(event)
	{
		location.href = "/fridges/addFridge.html";
		console.log("ADD BUTTON CLICKED");

	});

	fridgesSection.appendChild(header);
	fridgesSection.appendChild(addFridge);

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
			displayFridgeContents(parseInt(fridgeID),fridges,items);
		});

		let editFridge = document.createElement("Button");
		editFridge.textContent = "Edit fridge "+fridges[i].id;
		editFridge.className = "editFridgeB";
		editFridge.addEventListener("click",function(event)
		{
			console.log(fridges[i].id+" CLICKED");
			var fridge_ID = fridges[i].id;
			localStorage.setItem("textvalue",fridge_ID);
			location.href = "/fridges/editFridge.html";
			
		});

		fridgesSection.appendChild(fridgeData);
		fridgesSection.appendChild(editFridge);
	}
}

function displayFridgeContents(fridgeID,fridges,items){
	document.getElementById("frigeHeading").innerHTML = "Items in the " + fridges[fridgeID].name;
	let bioInformation = "<span id='fridge_name'>" + fridges[fridgeID].name + "</span><br />" + fridges[fridgeID].address.street + "<br />" + fridges[fridgeID].contact_phone;

	document.getElementById("left-column").firstElementChild.innerHTML = bioInformation;
	let capacity = ((fridges[fridgeID].items.length) / (parseInt(fridges[fridgeID].can_accept_items)));
	capacity = Math.round(capacity * 100);

	document.getElementById("meter").innerHTML = "<span style='width: " + (capacity + 14.2)  + "%'>" + capacity + "%</span>";

	populateLeftMenu(fridgeID,fridges,items);

  let middleColumn = document.getElementById("middle-column");
	console.log(fridgeID);

	let rightColumn = document.getElementById("right-column");
	let pickItem = document.createElement("button");
	pickItem.id = "pB";
	pickItem.textContent = "Pick up Items";
	pickItem.className = "pick_button";

	console.log(document.getElementById("items_picked").getElementsByTagName("li").length);
	if(document.getElementById("items_picked").getElementsByTagName("li").length == 0)
	{
		pickItem.style.visibility = "hidden";
	}
	
	rightColumn.appendChild(pickItem);
	for(let element of fridges[fridgeID].items){
		let itemID = parseInt(element.id);
		let item = items[itemID];

		let mdItem = document.createElement("div");
		mdItem.className = "item " + item.type;
		mdItem.id = "item-" + itemID;
		mdItem.innerHTML = "<img src='" + item.img + "' width='100px' height='100px'; />";

		let itemDetails = document.createElement("div");
		itemDetails.id = "item_details";
		itemDetails.innerHTML = "<p id='nm-" + itemID + "'>" + item.name + "</p><p>Quantity: <span id='qt-" + itemID + "'>" + element.quantity + "</span></p><p>Pickup item:</p>";

		let buttonsArea = document.createElement("div");
		buttonsArea.className = "pick_button";
		buttonsArea.id = "pickbtn-" + itemID;

		let increaseButton = document.createElement("button");
		increaseButton.className = "button-plus";
		increaseButton.innerHTML = "<i class='fas fa-plus'></i>";
		increaseButton.addEventListener("click", processIncrease);

		let decreaseButton = document.createElement("button");
		decreaseButton.className = "button-minus";
		decreaseButton.innerHTML = "<i class='fas fa-minus'></i>";
		decreaseButton.addEventListener("click", processDecrease);

		let amount = document.createElement("span");
		amount.className = "amount";
		amount.id = "amount-" + itemID;
		amount.textContent = "0";

		buttonsArea.appendChild(increaseButton);
		buttonsArea.appendChild(amount);
		buttonsArea.appendChild(decreaseButton);

		itemDetails.appendChild(buttonsArea);
		mdItem.appendChild(itemDetails);
		middleColumn.appendChild(mdItem);
	}
	document.getElementById("fridges").classList.add("hidden");
	document.getElementById("fridge_details").classList.remove("hidden");
}

function processIncrease(event) {
	if(document.getElementById("items_picked").getElementsByTagName("li").length > 0)
	{
		document.getElementById("pB").style.visibility = "visible";
	}
	let elementId = event.currentTarget.parentElement.id;
	let numID = elementId.split("-")[1];
	let amount = parseInt(document.getElementById("amount-"+numID).textContent);
	let quantity = parseInt(document.getElementById("qt-" + numID).textContent);
	let name = document.getElementById("nm-" + numID).textContent;

	let elementExists = document.getElementById("pk-item-" + numID);

	if(amount < quantity){
		document.getElementById("amount-"+numID).innerHTML = amount + 1;

		if(elementExists == null){
			let li = document.createElement("li");
			li.setAttribute("id", "pk-item-" + numID);
			li.innerHTML = "<span>" + (amount+1) + "</span> x " + name;
			document.getElementById("items_picked").appendChild(li);
		}
		else {
			document.getElementById("pk-item-"+numID).innerHTML = "<span>" + (amount+ 1) + "</span> x " + name;
		}
	}
}
function processDecrease(event) {
	if(document.getElementById("items_picked").getElementsByTagName("li").length == 0)
	{
		pickItem.style.visibility = "hidden";
	}
	let elementId = event.currentTarget.parentElement.id;
	let numID = elementId.split("-")[1];

	let amount = parseInt(document.getElementById("amount-"+numID).textContent);
	let quantity = parseInt(document.getElementById("qt-" + numID).textContent);
	let elementExists = document.getElementById("pk-item-" + numID);
	let name = document.getElementById("nm-" + numID).textContent;

	if(amount > 0){
		document.getElementById("amount-" + numID).innerHTML = parseInt(amount) - 1;
		if(elementExists == null){
				let li = document.createElement("li");
				li.setAttribute("id", "pk-item-" + numID);
				li.innerHTML = "<span>" + parseInt(amount) - 1 + "</span> x " + name;
				document.getElementById("items_picked").appendChild(li);
		}
		else{
			if(amount == 1){
				let item = document.getElementById("pk-item-"+numID);
				console.log("item-"+numID)
				item.remove();
			}
			else{
					document.getElementById("pk-item-"+numID).innerHTML = "<span>" + (amount- 1) + "</span> x " + name;
			}
		}
	}
}

function populateLeftMenu(fridgeID,fridges,items){
	let categories = {};

	for(let element of fridges[fridgeID].items){
		//console.log(element);
		let itemID = parseInt(element.id);
		let item = items[itemID];

		let type = item.type;
		if(type in categories == false){
			categories[type] = 1;
		}
		else {
			categories[type]++;
		}
	}

	let leftMenu = document.getElementById("categories");
	for(const[key, value] of Object.entries(categories)){
		let label = key.charAt(0).toUpperCase() + key.slice(1);
		let listItem = document.createElement("li");
		listItem.id = key;
		listItem.className = "category";
		listItem.textContent = label + " (" + value  + ")";

		listItem.addEventListener("click", filterMiddleView);
		leftMenu.appendChild(listItem);
	}
}

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

function retrieveFridgeData()
{

  xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
  xhttp.onreadystatechange = processFridgeData; // specify what should happen when the server sends a response

  // TODO: set the URL to be http://localhost:8000/students
  xhttp.open("GET", "http://localhost:8000/items", true); // open a connection to the server using the GET protocol

  // TODO: add an application/json Accept request header for the request
  xhttp.setRequestHeader("Content-type","application/json");

  xhttp.send(); // send the request to the server
}

function processFridgeData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
			  let data = JSON.parse(xhttp.responseText);
			  let fridges = data[0];
			  let items = data[1];
			  displayFridges(fridges,items);

	  }
	  else {
		  console.log("There was a problem with the request.");
	  }
}

function retrieveItemData()
{
  xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
  xhttp.onreadystatechange = processItemData; // specify what should happen when the server sends a response

  // TODO: set the URL to be http://localhost:8000/students
  xhttp.open("GET", "http://localhost:8000/items", true); // open a connection to the server using the GET protocol

  // TODO: add an application/json Accept request header for the request
  xhttp.setRequestHeader("Content-type","application/json");

  xhttp.send(); // send the request to the server
  
}

function processItemData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
			  let data = JSON.parse(xhttp.responseText);
			  //console.log(data);
	  }
	  else {
		  console.log("There was a problem with the request.");
	  }
}

function rItemData()
{
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
  xhttp.onreadystatechange = processrItemData; // specify what should happen when the server sends a response

  // TODO: set the URL to be http://localhost:8000/students
  xhttp.open("GET", "http://localhost:8000/items/itemDATA", true); // open a connection to the server using the GET protocol

  // TODO: add an application/json Accept request header for the request
  xhttp.setRequestHeader("Content-type","application/json");

  xhttp.send(); // send the request to the server
}

function processrItemData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
			  let data = JSON.parse(xhttp.responseText);
			  displayAddFridges(data);
			  console.log(data);
	  }
	  else {
		  console.log("There was a problem with the request.");
	  }
}


function reItemData()
{
	xhttp = new XMLHttpRequest(); // create a new XMLHttpRequest object
  xhttp.onreadystatechange = processreItemData; // specify what should happen when the server sends a response

  // TODO: set the URL to be http://localhost:8000/students
  xhttp.open("GET", "http://localhost:8000/items/itemDATA", true); // open a connection to the server using the GET protocol

  // TODO: add an application/json Accept request header for the request
  xhttp.setRequestHeader("Content-type","application/json");

  xhttp.send(); // send the request to the server
}

function processreItemData(){
	if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200)
	{
			  let data = JSON.parse(xhttp.responseText);
			  displayEditFridges(data,localStorage.getItem("textvalue"));
			  console.log(data);
	  }
	  else {
		  console.log("There was a problem with the request.");
	  }
}

