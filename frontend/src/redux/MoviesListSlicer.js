import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const popularDayMovies = createAsyncThunk(
    'movies/fetchDayMoviesApi',
    async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=c43d9d587e46f628e40146067ece7b86',requestOptions )
        const data = await response.json()
        return data
    }
  );
  
  export const popularWeekMovies = createAsyncThunk(
    'movies/fetchWeekMoviesApi',
    async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=c43d9d587e46f628e40146067ece7b86',requestOptions )
        const data = await response.json()
        return data
    }
  );
  
 export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        listOfMovies: [],
        status: null
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
      },
    extraReducers: {

        [popularDayMovies.fulfilled] : (state, action)=>{
            state.listOfMovies = action.payload
            state.status = "success"
        },
        [popularDayMovies.pending] : (state)=>{
            state.status = "loading";
        },
        [popularDayMovies.rejected] : (state)=>{
            state.status = "faild"
        },

        [popularWeekMovies.fulfilled] : (state, action)=>{
            state.listOfMovies = action.payload
            state.status = "success"
        },
        [popularWeekMovies.pending] : (state)=>{
            state.status = "loading";
        },
        [popularWeekMovies.rejected] : (state)=>{
            state.status = "faild"
        },
    
    }
  });


  export default moviesSlice.reducer