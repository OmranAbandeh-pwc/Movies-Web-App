import "../style/navbar.css";
import {BiSearch} from 'react-icons/bi'
import {BsFillBookmarkFill} from 'react-icons/bs'
import {RiEnglishInput} from 'react-icons/ri'
import {MdClear} from "react-icons/md"
import {CiLogout} from 'react-icons/ci'
import SearchBarFilter from "./SearchBarFilter";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchIcon, setSearchIcon] = useState(true)
  let userin = localStorage.getItem("userid")

  const setSearchIconFunc = () => {
    setSearchIcon(!searchIcon)
  }
  const logout = () => {
    localStorage.clear("userid")
    window.location.reload(false)
   }
  return (
    <>
    <nav>
        <div className="nav-logo-container">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"/>
        </div>
      
      {userin !== null ?
      <div className="navbar-icons">
        <ul>
          <li><Link to="/watchedlist/"> <BsFillBookmarkFill className="bookmark-icon"/> </Link></li>
          <li ><RiEnglishInput className="english-icon"/></li>
          <li>{searchIcon? <BiSearch className="search-icon" onClick={setSearchIconFunc}/> : <MdClear className="logout-icon" onClick={setSearchIconFunc}/>}</li>
          <li><CiLogout className="logout-icon" onClick={logout}/></li>
          
        </ul>
      </div> :
      ""}
     
    </nav> 
    {!searchIcon ? <SearchBarFilter/> : ""}   
   
    </>
  )
}

export default NavBar

