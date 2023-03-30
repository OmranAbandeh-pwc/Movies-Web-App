import { Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import MovieDetails from "./pages/MovieDetails";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import WatchedPage from "./pages/WatchedPage";
import { useEffect } from "react";


function App() {
  

  useEffect(() => {

  },[])

  let userToken = localStorage.getItem("usertoken")
  
  return (
    
    <>
      
      { userToken === null ? <LoginPage/> :
        <Routes>
         <Route path="/" element={<MainPage/>}/>
         <Route path="/watchedlist/" element={<WatchedPage/>}/>
         <Route path="/detailspage/:id" element={<MovieDetails/>}/>
         <Route path="/searchpage/:query" element={<SearchPage/>}/>
       </Routes>}
    </>
  );
}

export default App;
