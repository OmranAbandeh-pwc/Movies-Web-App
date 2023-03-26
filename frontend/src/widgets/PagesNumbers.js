import React, { useEffect, useState } from 'react'
import "../style/widgets/pagesnumbers.css"

const PagesNumbers = () => {
let pages = 30
const [firstPageButton, setFirstPageButton] = useState(0)
const [secondPageButton, setSecondPageButton] = useState(0)
const [theirdPageButton, setTheirdPageButton] = useState(0)
const [pageIndex, setPageIndex] = useState(0)
let mainPageNumbers = []


useEffect(() => {
    setMainPageNumbers()
    
})


const setMainPageNumbers = () => {  
    let pageNumbers = []
    for(let i = 1; i < pages; i++){
        pageNumbers.push(i)
        if(pageNumbers.length > 2){
            mainPageNumbers.push(pageNumbers)
            pageNumbers = []
        }
    }
    setFirstPageButton(mainPageNumbers[pageIndex][0])
    setSecondPageButton(mainPageNumbers[pageIndex][1])
    setTheirdPageButton(mainPageNumbers[pageIndex][2])
}
  
const moveToNextPage = () => {
    if(pageIndex < mainPageNumbers.length -1){
        setPageIndex(pageIndex + 1)
    }else{
    alert("There is no other page!")
    }
}

const moveToPrePage = () => {
    if(pageIndex === 0){
        alert("There is no pre page!")
    }else{
    setPageIndex(pageIndex - 1)
    }
}

    
  return (
    <>
    <div className='page-numbers-container'>
      <button onClick={moveToPrePage}>{"<<"}</button>
            <div >
                <button onClick={() => console.log(firstPageButton)}> {firstPageButton}    </button>
                <button onClick={() => console.log(secondPageButton)}> {secondPageButton}  </button>
                <button onClick={() => console.log(theirdPageButton)}> {theirdPageButton}  </button>
            </div>
        <button onClick={moveToNextPage}>{">>"}</button>
    </div>
    </>
  )
}

export default PagesNumbers


// for(let i = 1; i < listPage; i++){
        
//     pageNumbers.push(i)
//     if(pageNumbers.length > 2){
//         mainPageNumbers.push(pageNumbers)
        
//         pageNumbers = []
//     }
// }