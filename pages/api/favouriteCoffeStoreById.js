import {  findRecordByFilter, table} from "../../libs/airTable";
const favouriteCoffeeStoreById = async(req,res) =>{

   if(req.method === "PUT"){
       try {
           const {id} = req.body;
           if(id){
               const records = await findRecordByFilter(id);
               if(records.length !== 0){
                   const record = records[0];
                   const calculateVoting = parseInt(record.vote)+parseInt(1);
                   
                   const updateRecord = await table.update([{
                       id:record.recordId,
                       fields:{
                          vote:calculateVoting 
                       },
                    }]);
                     if(updateRecord){
                        res.json({records})
                     }
               }
               else{
                res.status(401)
                res.json({message:"coffeeStore Doesn't Exits",id})  
               } 
           }
           else{
            res.status(400)
            res.json({message:"Id is missing"})  
           }
       } catch (error) {
          console.error("Error UpVoting",error);
          res.status(500)
          res.json({message:"Error UpVoting"}) 
       }
   }

}

export default favouriteCoffeeStoreById;