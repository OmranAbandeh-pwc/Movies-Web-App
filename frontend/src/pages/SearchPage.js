import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "../style/searchpage.css"
import SearchBarFilter from "../components/SearchBarFilter"

const SearchPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchedMovies, setSearchedMovies] = useState([])
  const {query} = useParams()
  const [totalPages, setTotalPages] =useState(1)


  useEffect(() => {
    const getMovies = async () => {
     
      const moviesFormer = await fetchSearchedApi()
      setSearchedMovies(moviesFormer.results)
      setTotalPages(moviesFormer.total_pages)
      console.log(moviesFormer)
    }
    getMovies()   
  
  }, [pageNumber])

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const fetchSearchedApi = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${pageNumber}&api_key=8d93590a0dee93ef264a94b3755603f8`, requestOptions)
    const data = await response.json()
    return data;
  }
  
  const moveToNextPage = () => {
    if(pageNumber === totalPages){
      alert("No more pages to show")
    }else{
       setPageNumber(pageNumber + 1)
    }
}

const moveToPrePage = () => {
  if(pageNumber === 1){
    alert("This is the first page")
  }else{
     setPageNumber(pageNumber - 1)
  }
}

  return (
    <>
    <SearchBarFilter/>
    
    
    <div className="main-container-searchpage">
        
      {searchedMovies.map((movie) => (<Link key={movie.id}  to={`/detailspage/${movie.id}`} className="searched-card-link"><div className="searched-card" >
        <div className="image-container">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
        </div>
        <div className="moive-info-container">
            <div className="movie-searched-name">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
            <div className="movie-searched-description">
            {movie.overview}
            </div>
        </div>
      </div></Link>))}
  
    </div>
    
    <div className='page-numbers-container'>
      <button onClick={moveToPrePage}>{"<<"}</button>
      <span>{pageNumber}</span>
        <button onClick={moveToNextPage}>{">>"}</button>
    </div>
    </>
  )
}

export default SearchPage
