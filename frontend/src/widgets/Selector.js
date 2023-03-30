import React, { useState } from 'react'
import "../style/widgets/selector.css"
const Selector = ({today, thisweek, dayFun, weekFun}) => {
   
    
  return (
    <>
      <div className="selector-container">
		    <button onClick={dayFun}  className={today?`today-selector-on`:`today-selector-off`}>Today</button>
        <button onClick={weekFun} className={thisweek?`week-selector-on`:`week-selector-off`}>This Week</button>
	    </div>
    </>
  )
}

export default Selector
