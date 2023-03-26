import { configureStore } from "@reduxjs/toolkit";
import iconsSlice from "./iconsSlice";
import { moviesSlice } from "./MoviesListSlicer";



export const store = configureStore({
    
    reducer: {
        
        icons: iconsSlice,
        movies: moviesSlice.reducer
      
    },
})