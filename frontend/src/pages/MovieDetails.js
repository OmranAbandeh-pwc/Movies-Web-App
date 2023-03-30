import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CastCardSlider from "../widgets/CastCardSlider"
import NavBar from "../components/NavBar"
import { AiFillHeart, AiFillDatabase} from 'react-icons/ai'
import {BsFillBookmarkFill,BsStarFill} from 'react-icons/bs'
import "../style/pages/moviedetails.css"
import CircularProgressWidget from '../widgets/CircularProgressWidget'


const MovieDetails = () => {

  const {id} = useParams()
  const [movieDetails, setMovieDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [watched, setWatched] = useState(false)
  

  useEffect(() => {
    
    getMovies() 
    
    
  }, [])
  

  const getMovies = async () => {
    setIsLoading(true)
    const moviesFormer = await fetchMovieDetailsAPI()
    setMovieDetails(moviesFormer)
    setIsLoading(false) 
   
  }
 
  // Fetching movie details api to get all the movie info
  const fetchMovieDetailsAPI = async () => {

    var myHeaders = new Headers();
    const usertoken = localStorage.getItem('usertoken')
    myHeaders.append("Authorization", `Bearer ${usertoken}`);


    var request = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8d93590a0dee93ef264a94b3755603f8`, requestOptions)
    const data = await response.json()
    const watchedResponse = await fetch(`/api/watchedlist/singlemovie/${data.id}`, request)
    const watchedData = await watchedResponse.json()
    if(watchedData.msg === 'exist'){
      setWatched(true)
    } else {
      setWatched(false)
    }
    return data;
  }




  // This Function is made to get only the year from the movie date
  const getYear = () => {
  let year = ""
  if(isLoading){}else{
  const date = `${movieDetails.release_date}`
  for(let i = 0 ; i <= 3; i++){
      year += date[i]
    }
  }
  return `(${year})`;
  }

  // Function to Put & Remove the movie from Watched List
  const handleWatchedList = async () => {
    const usertoken = localStorage.getItem('usertoken')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${usertoken}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "id": movieDetails.id,
      "poster_path": movieDetails.poster_path,
      "title": movieDetails.title,
      "release_date": movieDetails.release_date,
      "vote_average": movieDetails.vote_average,
      "isWatched": true
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const response = await fetch("/api/watchedlist/moviewatchedlist/", requestOptions)
    const data = await response.json()
    if(data.msg === 'exist'){
      setWatched(false)
      var requestDelete = {
        method: 'DELETE',
        redirect: 'follow'
      };
      fetch(`/api/watchedlist/deletemovie/${movieDetails.id}`, requestDelete)
        .then(response => response.text())
    } else {
      setWatched(true)
    }
  }
  
 

  return (
    <>
      <NavBar/>
    {isLoading ? "...Loading" :
    <div className='movie-background-container' style={{backgroundRepeat:"no-repeat",backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.3)) , url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`}}>
      <div className='movie-container' >
        <div className='movie-image'>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}/>
        </div>
        <div className='movie-info' >
          <h1>{movieDetails.title}<span className='year'>{getYear()}</span></h1>
          <ul>
            <li>{movieDetails.release_date}</li>
            <li>. Drama</li>
            <li>. 1h 57m</li>
          </ul>
          <div className='icon-row'>
              <CircularProgressWidget height={65} width={65} percentage={34}/>
            <h3>User Score</h3>
              <div  className='icon-container'> <AiFillDatabase className='fav'  /> </div>
              <div onClick={handleWatchedList}  className='icon-container'> <BsFillBookmarkFill className='fav' style={watched ? { color:"orange" }:{ color:"white" }}   /> </div>
              <div  className='icon-container'> <AiFillHeart className='fav'   /> </div>
              <div  className='icon-container'> <BsStarFill className='fav'  /> </div>
            </div>
          <h3>Overview</h3>
          <p className='description'>{movieDetails.overview}</p>
          <div className='team-info'>
            <div>
              <h4 className='team-names'>Darren Aronofsky</h4>
              <p >Director</p>
            </div>
            <div>
              <h4 className='team-names'>Darren Aronofsky</h4>
              <p >Screenplay</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>}
    <div className="cast-type">Movie Cast</div>
    <CastCardSlider movieId={id}/>
    </>
  )
}

export default MovieDetails
