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
    const usertoken = localStorage.getItem('usertoken')
    myHeaders.append("Authorization", `Bearer ${usertoken}`);

    var raw = "";

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
    console.log(data)
    setLoading(false)
  }


  return (
    <>
    <h1>List of Watched Movies</h1>
       {loading ? "loading...." :
       
       <div className='movie-container'> 
        <div className='card-movie-container'>
          {<Card items={watchedMovies}/>}
        </div>
      </div>}
    </>
      
    
  )
}

export default WatchedPage
