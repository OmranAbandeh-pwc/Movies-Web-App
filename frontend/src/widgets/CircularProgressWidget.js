import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";




const CircularProgressWidget = ({height, width, percentage}) => {
  return (
    
    <div style={{ height: `${height}px `,width: `${width}px`}}>
    <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
        textSize:"1.7rem",
          backgroundColor: "black",
          textColor: "#fff",
          pathColor: "red",
          trailColor: "transparent"
        })}
      />
    </div> 
   
  )
}

export default CircularProgressWidget
