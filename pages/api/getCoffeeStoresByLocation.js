import { fetchCoffeeStores } from "../../libs/coffeeStores";

const getCoffeeStoresByLocation = async(req,res)=>{
    try {
       const {latLong,limit} = req.query;
       const response = await fetchCoffeeStores(latLong,limit);
       res.status(200)
       res.json(response) 
        
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({message:"Error in the server!",error})
    }
}

export default getCoffeeStoresByLocation