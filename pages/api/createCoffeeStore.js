import AirTable from 'airtable';
const base = new AirTable({apiKey:process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

const table = base("coffee-stores");

const createCoffeeStore = (req,res) =>{
    res.json({message:"Hello World"});
}

export default createCoffeeStore