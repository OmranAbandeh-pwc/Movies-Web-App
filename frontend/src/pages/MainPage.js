import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../style/body.css";
import Card from '../components/Card';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import "../style/searchbarstyle.css"
import Selector from "../components/Selector"
import { useSelector, useDispatch } from 'react-redux';
import { popularDayMovies, popularWeekMovies } from '../redux/MoviesListSlicer';


const Body = () => {

  const [query, setQuery] = useState()
  const [switcher, setSwitcher] = useState(true)

  const dispatch = useDispatch()
  const moviesSelector= useSelector(state => state.movies.listOfMovies.results) 
  const statusSelector = useSelector(state => state.movies.status)

  useEffect(() => {
  dispatch(popularDayMovies())
  }, [])

  // This Week Button
 const setWeek = () => {
  setSwitcher(false)
  dispatch(popularWeekMovies())
 }

 // This Day Button
 const setDay = () => {
  setSwitcher(true)
  dispatch(popularDayMovies())
 }

 

  return (
    <>
    <NavBar/>
    <div className='main-body-container'>{ 
      <div className="main-searchbar-container" style={{backgroundAttachment:"fixed",backgroundSize:"cover", backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.3)) , url(https://image.tmdb.org/t/p/w500/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg)`}}>
            <div className="welcome-container">
              
                <h1>Welcome.</h1>
                <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            </div>
          <div className="search-bar">
            <input type="text" placeholder="Search for a movie, TV Shows or series" onChange={(e) => setQuery(e.target.value)}/>
            <Link to={`/searchpage/${query}`}><button >search</button></Link>
          </div>
        </div>
            }
         
            <div className='selector-main-container'><div className="trending">Trending</div><Selector dayFun={setDay} weekFun={setWeek} today={switcher} thisweek={!switcher}/></div>
        <div className='movie-container'> 
        
          <div className='card-movie-container'>
            
            {statusSelector === "success" ? <Card items={moviesSelector} /> : "loading"}
            
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Body

