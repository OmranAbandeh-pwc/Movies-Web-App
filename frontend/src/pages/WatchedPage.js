import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import '../style/pages/watchedpage.css'

const WatchedPage = () => {

  const [watchedMovies, setWatchedMovies] = useState([])
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    movieWatchedListApi()
  },[])


  const test = watchedMovies.filter((elemen) => elemen.userid === localStorage.getItem('userid'))

 const movieWatchedListApi = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  setLoading(true)
   const response = await fetch("/api/watchedlist/getmovieswatchedlist/", requestOptions)
   const data = await response.json()
   const userMovies = data.filter((element) => element.userid === localStorage.getItem('userid'))
   setWatchedMovies(userMovies)
   setLoading(false)
   
 }


  return (
    <>
    <h1>List of Watched Movies</h1>
       {loading ? "loading" :
       
       <div className='movie-container'> 
        <div className='card-movie-container'>
          {<Card items={watchedMovies}/>}
        </div>
      </div>}
    </>
      
    
  )
}

export default WatchedPage
