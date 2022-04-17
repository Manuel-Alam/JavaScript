const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let addressSchema = mongoose.Schema({
    street:
        {
            type: String
        },
        postalCode:
        {
            type: String
        },
        city:
        {
            type: String
        },
        province:
        {
            type: String
        },
        country:
        {
            type: String
        }
});

let contactSchema = mongoose.Schema({
    contactPerson:
    {
        type: String
    },
    contactPhone:
    {
        type: String
    }
});

let itemSchema = mongoose.Schema({
    id: String,
    quantity: Number
});



// TODO: create the schema for a Fridge
let fridgeSchema = mongoose.Schema({
    id:
    {
        type: String, 
        required: true,
        min: 4, 
        max:6
    },
    name:
    {
        type: String, 
        required: true,
        min: 2, 
        max: 16
    },
    numItemsAccepted:
    {
        type: Number, 
        default: 0
    },
    canAcceptItems:
    {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    contactInfo:
    {
        type: contactSchema
        
    },
    address:
    {
        type: addressSchema,
        required: true,
        
    }, 
    acceptedTypes:
    {
        required:true,
        type: [String]
    },
    
    items: [itemSchema]

});

//Compile the previously defined schema into a model
//The model is what we will use to work with user documents
//First parameter is a string representing collection name that will be used for this model
//Second parameter is the schema
let fridgeModel = mongoose.model('Fridge', fridgeSchema);

fridgeModel.find(function(err, results){
    //console.log("Find all:");
    //console.log(results);
});



module.exports = fridgeModel;