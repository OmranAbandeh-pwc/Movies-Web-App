import { Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import MovieDetails from "./pages/MovieDetails";
import SearchPage from "./pages/SearchPage";
import Selector from "./components/Selector";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchedPage from "./pages/WatchedPage";



function App() {
  

  let userlogged = localStorage.getItem("userid")
  return (
    
    <>
      
      { userlogged === null ? <LoginPage/> :
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
