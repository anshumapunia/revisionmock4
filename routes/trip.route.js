const {Router}=require("express");
const tripRoute=Router()
const {TripModel}=require("../models/trip.model")

tripRoute.post("/trip", async(req,res)=>{
    try {
        const {name,email,destination,noOfTravelers,budgetPerPerson}=req.body;
        let newTrip=new TripModel({name,email,destination,noOfTravelers,budgetPerPerson})
        await newTrip.save()
        res.status(200).send({ "success": true, "message": "Trip registered successfully"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})



tripRoute.get("/trips",async(req,res)=>{
    try {
        const trips = await TripModel.find();
        res.status(200).send({ success: true, message: "you successfully get trips details", data:trips});
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
})

tripRoute.delete("/trip/:id",async(req,res)=>{
    try {
        const tripId = req.params.id;
        let trip=await TripModel.findByIdAndDelete(tripId);
        res.status(200).send({success:true,message:"trip is delete"});
      } catch (error) {
        res.status(400).send({ success: false, error: error.message });
      }
})

tripRoute.get("/trips/filter", async (req, res) => {
    try {
        const { destination, sortBy } = req.query;

        let query = {};

        if (destination) {
            query.destination = destination;
        }

        let sortOption = {};

        if (sortBy === "asc") {
            sortOption = { budgetPerPerson: 1 };
        } else if (sortBy ==="desc") {
            sortOption = { budgetPerPerson: -1 };
        }

        const trips = await TripModel.find(query).sort(sortOption);
        res.status(200).send({ success: true, message: "Filtered and sorted trips", data: trips });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})


module.exports={tripRoute}