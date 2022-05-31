import {findRecordByFilter } from "../../libs/airTable";

const getCoffeeStoreById = async(req,res) =>{
    const {id} = req.query;
    
    try {
        if(id){
            const findCoffeeStoreRecords = await findRecordByFilter(id);
               
            if (findCoffeeStoreRecords.length !== 0) {
              res.json(findCoffeeStoreRecords);
            } else {
              res.json({message:"id could not be found"})
            } 
        }
        else{
         res.status(400)
         res.json({message:"Id is missing"})    
        }
    } catch (error) {
       res.status(500)
       res.json({message:"Something Went Wrong",error}) 
    }
}

export default getCoffeeStoreById;