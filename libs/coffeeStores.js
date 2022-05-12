import { createApi } from 'unsplash-js';

const unPlashApi = createApi({
  accessKey: process.env.UNSPLASHACCESSKEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong,query,limit) =>{
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

export const fetchCoffeeStores = async ()=>{

  unsplash.search.getPhotos({
    query: 'cat',
    page: 1,
    perPage: 10,
    color: 'green',
    orientation: 'portrait',
  });

    const latLong = "43.65267326999575,-79.39545615725015";
    const limit = 8
    const query = 'coffee stores' 
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.FOURSQUREAPIKEY}`
      }
    };
    
    const response  = await fetch(getUrlForCoffeeStores(latLong,query,limit), options)
    
    const data = await response.json()

    return data.results;
  }