import { createSlice } from "@reduxjs/toolkit";

export const iconsSlice = createSlice({
    name: "icons",
    initialState: {
        reactIcons: {
            listIcon: false,
            bookMarkIcon: false,
            favoriteIcon: false,
            starIcon: false,
        }
    },
    reducers: {
        changeListIcon: function(state, action){
            state.reactIcons.listIcon = !state.reactIcons.listIcon
        },
        changeBookMarkIcon: function(state, action){
            state.reactIcons.bookMarkIcon = !state.reactIcons.bookMarkIcon    
        },
        changeFavoriteIcon: function(state, action){
            state.reactIcons.favoriteIcon = !state.reactIcons.favoriteIcon  
        },
        changeStarIcon: function(state, action){
            state.reactIcons.starIcon= !state.reactIcons.starIcon   
        }
    },
})

export const { changeListIcon, changeBookMarkIcon, changeFavoriteIcon, changeStarIcon } = iconsSlice.actions
export default iconsSlice.reducer