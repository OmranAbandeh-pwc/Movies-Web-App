import React from 'react'
import "../style/widgets/castcard.css"

const CastCard = ({casts}) => {
  return (
    <>
    {casts.map((cast) => (
    <div key={cast.cast_id} className='cast-card'>
      <div className='cast-img-container'>
        <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}/>
      </div>
      <div className='cast-name-container'>
        <span>{cast.original_name}</span>
        <p>{cast.character}</p>
      </div>
    </div>))}
    </>
  )
}

export default CastCard
