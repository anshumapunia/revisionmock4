const mongoose=require("mongoose");

const tripSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    destination:{type:String,enum:["India","Africa","Europe","America"],default:"India",required:true},
    noOfTravelers:{type:Number,required:true},
    budgetPerPerson:{type:Number,required:true}
},{
    versionKey:false,
    timestamps:true
})

const TripModel=mongoose.model("Trip",tripSchema)

module.exports={TripModel}