import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "../style/moviedetails.css"
import CastCardSlider from "../widgets/CastCardSlider"
import NavBar from "../components/NavBar"
import { AiFillHeart, AiFillDatabase} from 'react-icons/ai'
import {BsFillBookmarkFill,BsStarFill} from 'react-icons/bs'
import "../style/moviedetails.css"
import CircularProgressWidget from '../widgets/CircularProgressWidget'


const MovieDetails = () => {

  const {id} = useParams()
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [watched, setWatched] = useState(null)

  useEffect(() => {
  
    getMovies()   
    
  }, [])
  

  const getMovies = async () => {
    setIsLoading(true)
    const moviesFormer = await fetchMovieDetailsAPI()
    setMovies(moviesFormer)
    //console.log(moviesFormer)
    setIsLoading(false)  
  }
 
  // Fetching movie details api to get all the movie info
  const fetchMovieDetailsAPI = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8d93590a0dee93ef264a94b3755603f8`, requestOptions)
    const data = await response.json()
    const res = await fetch(`/api/watchedlist/singlemovie/${data.id}`, requestOptions)
    const dt = await res.json()
    if(dt.msg === 'exist' && localStorage.getItem('userid') === dt.movie.userid){
      setWatched(true)
    }else{
      setWatched(false)
    }
    return data;
  }

  // API to send movie to the Watched List Page
  const handlingWatchedList = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "id": movies.id,
      "userid": localStorage.getItem('userid'),
      "poster_path": movies.poster_path,
      "title": movies.title,
      "release_date": movies.release_date,
      "vote_average": movies.vote_average,
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
      fetch(`/api/watchedlist/deletemovie/${movies.id}`, requestDelete)
        .then(response => response.text())
    } else {
      setWatched(true)
    } 
  }

  // This Function is made to get only the year from the movie date
  const getYear = () => {
  let year = ""
  if(isLoading){}else{
  const date = `${movies.release_date}`
  for(let i = 0 ; i <= 3; i++){
      year += date[i]
    }
  }
  return `(${year})`;
  }

 

  return (
    <>
      <NavBar/>
    {isLoading ? "...Loading" :
    <div className='movie-background-container' style={{backgroundRepeat:"no-repeat",backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.3)) , url(https://image.tmdb.org/t/p/w500${movies.backdrop_path})`}}>
      <div className='movie-container' >
        <div className='movie-image'>
            <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}/>
        </div>
        <div className='movie-info' >
          <h1>{movies.title}<span className='year'>{getYear()}</span></h1>
          <ul>
            <li>{movies.release_date}</li>
            <li>. Drama</li>
            <li>. 1h 57m</li>
          </ul>
          <div className='icon-row'>
              <CircularProgressWidget height={65} width={65} percentage={34}/>
            <h3>User Score</h3>
              <div  className='icon-container'> <AiFillDatabase className='fav'  /> </div>
              <div onClick={handlingWatchedList}  className='icon-container'> <BsFillBookmarkFill className='fav' style={watched ? { color:"orange" }:{ color:"white" }}   /> </div>
              <div  className='icon-container'> <AiFillHeart className='fav'   /> </div>
              <div  className='icon-container'> <BsStarFill className='fav'  /> </div>
            </div>
          <h3>Overview</h3>
          <p className='description'>{movies.overview}</p>
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
