import React, { useEffect, useState } from 'react'
import "../style/widgets/castcardslider.css"
import CastCard from './CastCard'

const CastCardSlider = ({movieId}) => {

    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
   
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
 
useEffect(() => {
    const fetchCastApi = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8d93590a0dee93ef264a94b3755603f8`,
         requestOptions)
         const data = await response.json()
         setCast(data.cast)
    }
    fetchCastApi()
},[])

    
  return (
    <div className='cast-card-slider'>
      <CastCard casts={cast}/>     
    </div>
  )
}

export default CastCardSlider
