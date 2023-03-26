import "../style/searchbarstyle.css"

const SearchBar = () => {
  return (
    <div className="main-searchbar-container">
        <div className="welcome-container">
            <h1>Welcome.</h1>
            <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
      <div className="search-bar">
        <input type="text" placeholder="search here"/>
        <button>search</button>
      </div>
    </div>
  )
}

export default SearchBar
