import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    drawerState : false
}

const UtilSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        setDrawerState : (state, action) => {
            state.drawerState = action.payload
        }
    }
})

export const {setDrawerState} = UtilSlice.actions;

export default UtilSlice.reducer;