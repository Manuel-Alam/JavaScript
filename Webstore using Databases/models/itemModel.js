const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: create the schema for an Item
let itemSchema = mongoose.Schema({

    id: 
    {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 4
    },
    name:
    {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    type:
    {
        type: String,
        required: true
    },
    img:
    {
        type: String,
        required: true,
        min: 15,
        max: 22
    }
    

});

//Compile the previously defined schema into a model
//The model is what we will use to work with user documents
//First parameter is a string representing collection name that will be used for this model
//Second parameter is the schema
let ItemModel = mongoose.model('Item', itemSchema);

ItemModel.find(function(err, results){
    //console.log("Find all:");
    //console.log(results);
});



module.exports = ItemModel;
