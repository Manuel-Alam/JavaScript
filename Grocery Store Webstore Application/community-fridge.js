let fridgeA = {
	name: "Parkdale fridge", // name of the fridge
	capacity: 45,
	contact_person: "Jane Doe",
	contact_phone: " (613) 722-8019",

	// Location of the fridge
	address: {
		street: "30 Rosemount Ave #2",
		postal_code: "K1Y 1P4",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeB = {
	name: "Morrison fridge", // name of the fridge
	capacity: 80,
	contact_person: "John Doe",
	contact_phone: "(613) 596-6229",

	// Location of the fridge
	address: {
		street: "3985-A Morrison Drive",
		postal_code: "K2H 7L1",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeC = {
	name: "Somerset fridge", // name of the fridge
	capacity: 65,
	contact_person: "Mary Doe",
	contact_phone: "(613) 238-8210",

	// Location of the fridge
	address: {
		street: "55 Eccles Street",
		postal_code: "K1R 6S3",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

//initialize array of fridges
let fridges = [fridgeA, fridgeB, fridgeC];

//get homepage div from html page
let homepage = document.getElementById("homepage");

//get pickupitempage div from html page
let pickupitempage = document.getElementById("pickupitempage");

//get homeButtonDiv div from html page
let homeButtonDiv = document.getElementById("homeButtonDiv");

//get itemsInFridgeDiv from html page
let itemsInFridgeDiv = document.getElementById("itemsInFridge");

//set the pickupitempage div to invisible
pickupitempage.style.display = "none";

//set the homeButtonDiv div to invisible
homeButtonDiv.style.display = "none";

//this method will load all the fridges in the fridges array.
loadFridges();
// categories: dairy, pantry, meat and seafood, produce, bakery, frozen

//this method will display the next page when pick up item button is pressed
function pickItem()
{
	//set homepage invisible
	homepage.style.display = 'none';

	//set home button and next page visible
	pickupitempage.style.display = "block";
	homeButtonDiv.style.display = "block";

}

//function to bring user back to home page
function homeButton()
{
	//home page becomes visible
	homepage.style.display = 'block';

	//all other pages become invisible
	pickupitempage.style.display = "none";
	homeButtonDiv.style.display = "none";

	//hides all the items in each fridge
	let div = document.getElementById("itemsInFridge").children;
	for(let i = 0; i<fridges.length;i++)
	{
		div[i].style.display = "none";
	}

}

//this method will create and load everything regarding the items in the fridges, categories,etc..
function loadFridges()
{
	//for loop to create the contents for each fridge in the fridges array
	for(let i = 0; i < fridges.length;i++)
	{
		//div create to place the fridge and address on (circular div on pick item page)
		let div = document.createElement("div");
		div.className = "divfridge";
		
		//div created for users to select which category to pick when inside the fridge
		let div2 = document.createElement("div");
		div2.className = "dropdownmenu";

		//div created and named after fridge name to make checkout page for each fridge
		let div3 = document.createElement("div");
		div3.id = fridges[i].name;

		//divs and headers created when inside the fridge
		let header = document.createElement("header");
		let h1 = document.createElement("h1");
		header.appendChild(h1);
		h1.textContent = "Items in the "+fridges[i].name;
		div3.appendChild(header);
		div3.appendChild(div2);
		itemsInFridgeDiv.appendChild(div3);
		div3.style.display = "none";

		//created p element to put the fridge name on the circle div
		let nameP = document.createElement("p");
		nameP.textContent = fridges[i].name;
		nameP.className = "fridgeTitle";

		//created p element to put the fridge location on the circle div
		let streetP = document.createElement("p");
		streetP.textContent = fridges[i].address.street;
		streetP.className = "fridgeStreet";

		//created p element to put the fridge phone number on the circle div
		let phoneP = document.createElement("p");
		phoneP.textContent = fridges[i].contact_phone;
		phoneP.className = "fridgeStreet";

		//created d element to show progress bar
		let progressDiv = document.createElement("div");
		progressDiv.className = "progressBackground";

		//created div element to help make progress bar
		let progressBarDiv = document.createElement("div");
		progressBarDiv.className = "progressBar";

		//created percent variable to store capacity percent
		let percent = fridges[i].capacity + "%";
		progressBarDiv.style.width = percent;

		//created p element to store the percentage capacity on the progress bar
		let percentText = document.createElement("p");
		percentText.className = "percent";
		percentText.textContent = percent;
		progressBarDiv.appendChild(percentText);

		//created unordered list to pick a categories of items
		let list = document.createElement("ul");
		list.className = "list";

		//created cart div to store the p element of items added to cart
		let div6 = document.createElement("div");
		div6.className = "cart";

		//keep track of the number of each type of product
		let numProduce = 0;
		let numDariy = 0;
		let numBakery = 0;
		let numFrozen = 0;
		let numPantry = 0;

		//items array to store the item objects.
		let items = [];

		//for loop to add each item from each fridge to an item array
		for(let item in fridges[i].items)
		{
			//add item object to item array
			items.push(fridges[i].items[item]);

			//if the item is of type x increment the number of x1
			if(fridges[i].items[item].type === "produce")
			{
				numProduce++;
			}
			if(fridges[i].items[item].type === "dairy")
			{
				numDariy++;
			}
			if(fridges[i].items[item].type === "bakery")
			{
				numBakery++;
			}
			if(fridges[i].items[item].type === "frozen")
			{
				numFrozen++;
			}
			if(fridges[i].items[item].type === "pantry")
			{
				numPantry++;
			}
		}

		//div created to store all the items on each category on 1 div
		let div4 = document.createElement("div");
		div4.className = "selection";
		div3.appendChild(div4);
		div3.appendChild(div6);

		//div created to put the title on the cart
		let div7 = document.createElement("div");
		div7.className = "cartitle";

		//p element created to put the text of the title on the cart div
		let p4 = document.createElement("p");
		p4.className = "titlecart";
		p4.textContent = "You have picked up the follow items:";

		div6.appendChild(div7);
		div6.appendChild(p4);

		//divs created to store all the specific type of products in its own section
		let divProduce = document.createElement("div");
			divProduce.className = "produceSection";
			div3.appendChild(divProduce);

			let divDairy = document.createElement("div");
			divDairy.className = "dairySection";
			div3.appendChild(divDairy);

			let divBakery = document.createElement("div");
			divBakery.className = "bakerySection";
			div3.appendChild(divBakery);

			let divFrozen = document.createElement("div");
			divFrozen.className = "frozenSection";
			div3.appendChild(divFrozen);

			let divPantry = document.createElement("div");
			divPantry.className = "pantrySection";
			div3.appendChild(divPantry);

		//number of each product in cart to track
		let produceInCart = 0;
		let dairyInCart = 0;
		let bakeryInCart = 0;
		let frozenInCart = 0;
		let pantryInCart = 0;

		//created div to store all the products added to cart
		let cartl = document.createElement("div");
		cartl.className = "cartList";

		//for loop to create the items of each section and add them to their appropriate section
		for(let i = 0; i<items.length;i++)
		{
			//if the type of the item is one of the 6 default sections, then create it and add it to the specfic section
			if(items[i].type === "produce")
			{
				//method called to create item
				createItem(divProduce,items,i,produceInCart,div6,cartl);

				//set invisble temporarily so sections dont overlap
				divProduce.style.display = "none";

				//if theres no items of this type then this section wont be shown
				if(numProduce > 0)
				{
					divProduce.style.display = "block";
				}
			}

			if(items[i].type === "dairy")
			{
				
				createItem(divDairy,items,i,dairyInCart,div6,cartl);
				divDairy.style.display = "none";
				if(numProduce < 0 && numDariy > 0)
				{
					divDairy.style.display = "block";
				}

			}

			if(items[i].type === "bakery")
			{
				
				createItem(divBakery,items,i,bakeryInCart,div6,cartl);
				divBakery.style.display = "none";
				if(numDariy < 0 && numBakery > 0)
				{
					divBakery.style.display = "block";
				}

			}

			if(items[i].type === "frozen")
			{
				
				createItem(divFrozen,items,i,frozenInCart,div6,cartl);
				divFrozen.style.display = "none";
				if(numBakery < 0 && numFrozen > 0)
				{
					divFrozen.style.display = "block";
				}
			}

			if(items[i].type === "pantry")
			{
				
				createItem(divPantry,items,i,pantryInCart,div6,cartl);
				divPantry.style.display = "none";
				if(numFrozen < 0 && numPantry > 0)
				{
					divBakery.style.display = "block";
				}
			}
		}
		
		//each of these options are part of the unorded list as catergories to switch between
		let option1 = document.createElement("li");
		option1.className = "listoption";
		option1.textContent = "Produce ("+numProduce+")";
	
		let option2 = document.createElement("li");
		option2.textContent = "Dairy (" + numDariy+")";
		option2.className = "listoption";

		let option3 = document.createElement("li");
		option3.textContent = "Bakery (" + numBakery+")";
		option3.className = "listoption";

		let option4 = document.createElement("li");
		option4.textContent = "Frozen (" + numFrozen+")";
		option4.className = "listoption";

		let option5 = document.createElement("li");
		option5.textContent = "Pantry (" + numPantry+")";
		option5.className = "listoption";

		//sections array to store the divs of each default section
		let sections = [];
		sections.push(divProduce);
		sections.push(divDairy);
		sections.push(divBakery);
		sections.push(divFrozen);
		sections.push(divPantry);

		//calling toggle section method to add onclicks for each unordered list element to switch between sections when clicked
		toggleSection(divProduce, sections,numProduce,option1,div4);
		toggleSection(divDairy, sections,numDariy,option2,div4);
		toggleSection(divBakery, sections,numBakery,option3,div4);
		toggleSection(divFrozen, sections,numFrozen,option4,div4);
		toggleSection(divPantry, sections,numPantry,option5,div4);

		//adding each li element to the unordered list
		list.appendChild(option1);
		list.appendChild(option2);
		list.appendChild(option3);
		list.appendChild(option4);
		list.appendChild(option5);

		//adding all the fridge info to the left column div
		div2.appendChild(nameP);
		div2.appendChild(streetP);
		div2.appendChild(phoneP);
		div2.appendChild(progressDiv);
		div2.appendChild(list);
		progressDiv.appendChild(progressBarDiv);

		//when a specific fridge is pressed it will hide the pick fridge page and show whats in the fridge
		div.onclick = function()
		{
			pickupitempage.style.display = "none";
			div3.style.display = "block";

		}

		//created image element to put the fridge icon on each circular fridge div
		let image = document.createElement("img");
		image.src = "fridge.svg";
		image.className = "fridgeimg";

		//created each p element here to place on circular fridge div
		let name = document.createElement("p");
		name.className = "fridgename";
		name.textContent = fridges[i].name;

		let address= document.createElement("p");
		address.className = "fridgename";
		address.textContent = fridges[i].address.street;

		let phone = document.createElement("p");
		phone.className = "fridgename";
		phone.textContent = fridges[i].contact_phone;

		//added elements to circular fridge div
		div.appendChild(image);
		div.appendChild(name);
		div.appendChild(address);
		div.appendChild(phone);

		//add each circular div to the second page
		let mainDiv = document.getElementById("fridgediv");

		mainDiv.appendChild(div);
	}
}

//this method is used to make sections invisible and visible when switching between them
function toggleSection(div, sections,num,option,div4)
{
	//if the section has greater than 0 elements, viewing this section is possible.
	if(num > 0)
	{		
			//when a catergory is clicked make it visible and hide the rest.
			option.onclick = function()
			{	
				div.style.display = "block";
				div4.style.display = "none";	
				
				//for loop to find which divs should be hidden in all the sections
				for(let i = 0; i < sections.length;i++)
				{
					if(div != sections[i])
					{
						sections[i].style.display = "none";
					}
				}
				
			};
	}

}

//method to create an item
function createItem(selecitonDiv,items,i,incart,cart,cartl)
{
	//created div to store item properties on img, quantity, name, etc..
	let div5 = document.createElement("div");
			div5.className = "item";
			selecitonDiv.appendChild(div5);

			let image2 = document.createElement("img");
			image2.src = items[i].img;
			image2.className = "itemimage";

			let p1 = document.createElement("p");
			p1.textContent = items[i].name;
			p1.className = "itemname";

			let p2 = document.createElement("p");
			p2.textContent = "Quantity: "+items[i].quantity;
			p2.className = "itemquantity";

			let p3 = document.createElement("p");
			p3.textContent = "Pickup Item: ";
			p3.className = "itempickup";

			let div8 = document.createElement("div");
			div8.className = "plus";
		
			let image3 = document.createElement("img");
			image3.src = "Plus_symbol.svg.png";
			image3.className = "plusimage";

			let div9 = document.createElement("div");
			div9.className = "minus";

			let image4 = document.createElement("img");
			image4.src = "Minus_symbol.svg";
			image4.className = "minusimage";

			let div10 = document.createElement("div");
			div10.className = "quantitybox";

			let p5 = document.createElement("p");
			p5.className = "quantitynumber";
			p5.textContent = incart;

			let p = document.createElement("p");
			p.className = "cartItem";

			cart.appendChild(cartl);
			cartl.appendChild(p);

			//added onclick for + sign so when clicked it will update the number of said item in cart
			div8.onclick = function()
			{	
				//if there is at least 1 item then we can add something to cart
				if(items[i].quantity > 0)
				{
					//increment number of item in cart
					incart++;

					//refresh the text so it displays new value
					p5.textContent = incart;

					//decrease quantity since we added 1 to cart
					items[i].quantity--;
					
					p.style.display = "block";
					p.textContent = incart + " x "+items[i].name;
				}

			};

			//added onclick for - sign so when called it will update the number of said item in cart
			div9.onclick = function()
			{
				//if there is at least one item in the cart
				if(incart > 0)
				{
					//decrement since 1 item is being removed from cart
					incart--;

					//refresh the text so it displays new value
					p5.textContent = incart;

					//increase item quantity since it was removed from cart
					items[i].quantity++;
					
					//if none are in cart then remove the text displaying cart value
					if(incart === 0)
					{
						p.style.display = "none";
					}

					else
					{
						p.textContent = incart + " x "+items[i].name;
					}
					
				}

			};

			//adding all the divs to the fridge inventory page
			div10.appendChild(p5);
			div5.appendChild(image2);
			div5.appendChild(p1);
			div5.appendChild(p2);
			div5.appendChild(p3);
			div5.appendChild(div8);
			div5.appendChild(div9);
			div8.appendChild(image3);
			div9.appendChild(image4);
			div5.appendChild(div10);
}

//function used to create left column for each fridge
function loadItemsInFridge()
{
	for(let i = 0; i < fridges.length;i++)
	{
		let div = document.createElement("div");

		div.className = "dropdownmenu";

		let mainDiv = document.getElementById("itemsInFridge");
		mainDiv.appendChild(div);
	}
}	

