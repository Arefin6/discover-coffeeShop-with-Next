import AirTable from 'airtable';
const base = new AirTable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

const table = base("coffee-stores");

const createCoffeeStore = async(req,res) =>{

    try {
        const findCoffeeStoreRecords = await table.select({filterByFormula:`id="0"`,}).firstPage();

    if(findCoffeeStoreRecords.length !== 0){

        const record = findCoffeeStoreRecords.map(record =>{
            return {...record.fields}
        })

        res.json(record)
    }
    else{
        const createRecords = await table.create([
            {
              fields: {
                id:"0",
                name:"Cremo Coffee",
                address:"Noyasorok",
                neighborhood:"sip coffee",
                vote:10,
                ImageUrl:"myImage.com",
              },
            },
          ]);

          const record = createRecords.map(record =>{
            return {...record.fields}
           })
          res.jon(record)

    }
    } catch (error) {
        console.log("Something Went Wrong",error)
        res.status(500)
        res.json({message:"Something Went Wrong",error})
    }
    
    


}

export default createCoffeeStore;