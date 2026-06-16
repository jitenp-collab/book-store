import { createSlice } from "@reduxjs/toolkit";
import { RegisterUser, GetCurrentUser, logoutUser } from "../actions/actiont";

const globleSlice = createSlice({
    name: "globle",
    initialState: {
        userr: {},
        error: false,
        loading: false,
        image: '',
        user: [],
        presentUser: null,
        logoutUser: null,
        notificationTocken: null
    },

    reducers: {
        saveImage: (state, action) => {
            state.image = action.payload as any;
        },
        activeUser: (state, action) => {
            state.presentUser = action.payload as any
        },
        getTockenStore: (state, action) => {
            state.notificationTocken = action.payload as any
        }
    },

    extraReducers: (builder) => {
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.error = false,
                state.loading = false
            state.userr = action.payload as any
        })

        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.error = action.payload as any,
                state.loading = false
        })

        builder.addCase(GetCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload.users;
        });

        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.logoutUser = action.payload as any
            state.image = ""
        })
    }

})

export const { saveImage, activeUser, getTockenStore } = globleSlice.actions;
export default globleSlice.reducer