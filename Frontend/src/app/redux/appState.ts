import UserModel from "../models/user.model";

// Application global state: 
export type AppState = {

    // Third slice data - the user:
    user: UserModel;
};
