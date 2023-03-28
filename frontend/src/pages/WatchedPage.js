import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import '../style/pages/watchedpage.css'

const WatchedPage = () => {

  const [watchedMovies, setWatchedMovies] = useState([])
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    movieWatchedListApi()
  },[])




 const movieWatchedListApi = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userid": localStorage.getItem('userid')
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  setLoading(true)
  const response = await fetch("/api/watchedlist/getmovieswatchedlist/", requestOptions)
  const data = await response.json() 
  setWatchedMovies(data)
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
