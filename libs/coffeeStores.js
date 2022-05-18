import { createApi } from 'unsplash-js';

const unPlashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASHACCESSKEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong,query,limit) =>{
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unPlashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 10,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (latLong = "43.65267326999575,-79.39545615725015")=>{
   
    const photos = await getListOfCoffeeStorePhotos()
    const limit = 8
    const query = 'coffee stores' 
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.NEXT_PUBLIC_FOURSQUREAPIKEY}`
      }
    };
    
    const response  = await fetch(getUrlForCoffeeStores(latLong,query,limit), options)
    
    const data = await response.json()

    return data.results.map((data,index) =>{
      return{
        ...data,
        imageUrl: photos[index]
      } 
    });
  }