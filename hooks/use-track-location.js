import { useState } from "react";

const useTrackLocation = () =>{

    const [locationErrorMsg,setLocationErrorMsg] = useState('');
    const [latLong,setLatLong] = useState('');
    const [isLocating,setIsLocating] = useState(false);

     
    const success = (position) =>{
      
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`) 
        setLocationErrorMsg('')
        setIsLocating(false)

    }

    const error = () =>{
      setLocationErrorMsg('Unable To retrieve  your Location')
      setIsLocating(false)
    }

    const handleTrackLocation = () =>{
        setIsLocating(true)
        if(!navigator.geolocation) {
            setLocationErrorMsg('Geo Location is supported By your Browser')
            setIsLocating(false)
          } else {
            // status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
          }
    }


    return{
       latLong,
       locationErrorMsg,
       handleTrackLocation,
       isLocating
    }
}

export default useTrackLocation;