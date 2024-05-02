import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./appState";
import { authReducersContainer } from "./authSlice";

// Creating the application store - the redux manager object: 
export const appStore = configureStore<AppState>({
    reducer: {
        user: authReducersContainer
    }
});

