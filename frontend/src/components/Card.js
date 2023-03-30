import "../style/components/card.css"
import {CircularProgressbar, buildStyles} from  "react-circular-progressbar"
import CircularProgressWidget from "../widgets/CircularProgressWidget"
import { Link } from "react-router-dom";

const Card = ({items}) => {
  const imageUrl = "";
    
  return (<>
  {items.map((item) => (<Link key={item.id}  to={`/detailspage/${item.id}`} className="card-link"> <div className="card" >
      <div className="image-container">
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
      </div>
      <div className="circular-progressbar">
      <div className="w-10 absolute top-[13rem] left-2">
        <CircularProgressWidget height={38} width={38} percentage={~~(item.vote_average * 10) }/>
      </div>
      </div>
      <div className="info">
        <h3 className="title">{item.title}</h3>
        <p className="date">{item.release_date}</p>
      </div>
      
    </div></Link>))
    
}</>)
}

export default Card
