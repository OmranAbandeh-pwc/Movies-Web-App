import React, { useEffect, useState } from 'react'
import "../style/components/searchbarfilter.css"
import {MdClear} from "react-icons/md"

const SearchBarFilter = () => {

    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    useEffect(() => {
          const fetchSearchApi = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8d93590a0dee93ef264a94b3755603f8`, requestOptions)
            const data = await response.json()
            return data
          }
          const getSearchedMovies = async () => {
            setIsLoading(true)
            const moviesFormer = await fetchSearchApi()
            setMovies(moviesFormer.results)
            setIsLoading(false)  
          }
          getSearchedMovies()  
    },[query])

    const clearSearchBar = () => {
      setQuery("")
    }

 
  return (
    <>
      <div className="searc-bar-filter-container">
        <input placeholder='search' onChange={(e) => setQuery(e.target.value)} value={query}/>
        <button onClick={clearSearchBar}><MdClear/></button>
      </div>
        <div className='main-serach-filter-container'>{isLoading ? "...loading" : movies.map((item) => (<a href={`/searchpage/${item.title}`} key={item.id} className="search-result-link" ><div  className="resualt-search-container">{item.title}</div></a>))}</div>
     
    </>
  )
}

export default SearchBarFilter