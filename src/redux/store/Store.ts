import { configureStore } from "@reduxjs/toolkit";

import globleredcer from "../redusers/reducers"

export const store = configureStore({
    reducer: {
    
        globle:globleredcer
        
    }
})



export type StoreState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch