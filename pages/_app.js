import { createContext } from "react";
import { useReducer } from "react";
import "../styles/globals.css";

const StoreContext = createContext();


export const ACTION_TYPES = {
   SET_LAT_LONG:"SET_LAT_LONG",
   SET_COFFEE_STORES:"SET_COFFEE_STORES"
}

const storeReducer = (state,action)=>{
    switch (action.type){
      case ACTION_TYPES.SET_LAT_LONG:{
        return{...state,latLong:action.payload.latLong}
      }
      case ACTION_TYPES.SET_COFFEE_STORES:{
         return{...state,latLong:action.payload.CoffeeStores}
      }
      default:
        throw new Error(`Unhandled Action type :${action.type} `)
    }
}


const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    CoffeeStores: [],
  };
  const [state,dispatch] = useReducer(storeReducer,initialState)
  return (
    <StoreContext.Provider value={{ state,dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}

export default MyApp;
