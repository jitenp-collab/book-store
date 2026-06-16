import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, Users, isLogin } from "../../const/Const";

export const AddUser = createAsyncThunk("user/add", async (UserData: any, { rejectWithValue }) => {

    try {

        const AllUser = await AsyncStorage.getItem(Users)
        const PresentUser = await AsyncStorage.getItem(loginUser)

        const AllUserCall = AllUser ? JSON.parse(AllUser) : {}

        const PresentUserCall = PresentUser ? JSON.parse(PresentUser) : {}

        const mobile = PresentUserCall.currentUser

        if (!mobile || mobile === "undefined") {

            console.log("error hrere");
            return rejectWithValue("No user find found")
        }

        if (!AllUserCall[mobile]) {
            AllUserCall[mobile] = []
        }


        const existingUsers = AllUserCall[mobile];

        //  CHECK DUPLICATE EMAIL (case-insensitive)
        const isAlreadyExist = existingUsers.find(
            (u: any) =>
                u?.profile?.email?.toLowerCase() ===
                UserData?.email?.toLowerCase()
        );

        if (isAlreadyExist) {
            PresentUserCall.activeUser = isAlreadyExist;

            await AsyncStorage.setItem(
                Users,
                JSON.stringify(AllUserCall)
            );
            await AsyncStorage.setItem(
                loginUser,
                JSON.stringify(PresentUserCall)
            );

            return isAlreadyExist;
        }
        const newUser = {
            id: Date.now(),
            profile: {
                firstName: UserData.firstName,
                lastName: UserData.lastName,
                email: UserData.email,
                gender: UserData.gender,
                birthDate: UserData.birthDate,
                image: UserData.image || "",
            },
        };

        existingUsers.push(newUser);

        AllUserCall[mobile] = existingUsers;
        PresentUserCall.activeUser = newUser;

        await AsyncStorage.setItem(
            Users,
            JSON.stringify(AllUserCall)
        );
        await AsyncStorage.setItem(
            loginUser,
            JSON.stringify(PresentUserCall)
        );

        return newUser;
    } catch (error) {
        console.log("AddUser error:", error);
        return rejectWithValue("Something went wrong");
    }
}
);



export const UpdateUserImage = createAsyncThunk(
    "user/updateImage",
    async ({ userId, image }: any, { rejectWithValue }) => {
        try {
            const allUsersRaw = await AsyncStorage.getItem(Users);
            const loginRaw = await AsyncStorage.getItem(loginUser);

            const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
            const login = loginRaw ? JSON.parse(loginRaw) : {};

            const mobile = login.currentUser;
            const userList = allUsers[mobile] || [];

            // update users list
            const updatedUsers = userList.map((u: any) => {
                if (u.id === userId) {
                    return {
                        ...u,
                        profile: {
                            ...u.profile,
                            image,
                        },
                    };
                }
                return u;
            });

            allUsers[mobile] = updatedUsers;

            // ALSO update activeUser inside loginUser
            if (login.activeUser?.id === userId) {
                login.activeUser = {
                    ...login.activeUser,
                    profile: {
                        ...login.activeUser.profile,
                        image,
                    },
                };
            }

            // save both
            await AsyncStorage.setItem(Users, JSON.stringify(allUsers));
            await AsyncStorage.setItem(loginUser, JSON.stringify(login));



            return updatedUsers;
        } catch (error) {
            return rejectWithValue("Failed to update image");
        }
    }
);

export const GetCurrentUser = createAsyncThunk(
    "get/user",
    async (_, { rejectWithValue }) => {
        try {
            const usersData = await AsyncStorage.getItem(Users);
            const loginData = await AsyncStorage.getItem(loginUser);

            const users = usersData ? JSON.parse(usersData) : {};
            const login = loginData ? JSON.parse(loginData) : {};

            const mobile = login.currentUser;

            if (!mobile) {
                return rejectWithValue("No current user found");
            }

            const allUsersOfMobile = users[mobile] || [];

            return {
                mobile,
                users: allUsersOfMobile,
            };
        } catch (error) {
            return rejectWithValue("Error fetching users");
        }
    }
);


export const RegisterUser = createAsyncThunk("register/user", async (mobile: any, { rejectWithValue }) => {

    try {
        const CallUsers = await AsyncStorage.getItem(Users)
        const LoginUser = await AsyncStorage.getItem(isLogin)
        const loginUsernumber = await AsyncStorage.getItem(loginUser)
        const loginusername = loginUsernumber ? JSON.parse(loginUsernumber) : {}
        const call = LoginUser ? JSON.parse(LoginUser) : null
        const read = CallUsers ? JSON.parse(CallUsers) : {}
        if (!read[mobile]) {
            read[mobile] = []
        }
        const isAlreadyExist = read[mobile].includes(mobile)

        if (isAlreadyExist) {
            console.log("user already exist");
            return rejectWithValue("User already registered")
        }
        loginusername.currentUser = mobile
        await AsyncStorage.setItem(Users, JSON.stringify(read))
        await AsyncStorage.setItem(isLogin, JSON.stringify(true))
        await AsyncStorage.setItem(loginUser, JSON.stringify(loginusername))
        // console.log("islogin", call);
        // console.log("loginUser number", loginusername);
        // console.log("All Registered mobile nUmber", read);

        // const hasProfile = !!(
        //     loginusername.currentUser &&
        //     loginusername.activeUser?.profile
        // );

        // console.log(hasProfile);

        return read
    } catch (error) {
        console.log("not complete here");
    }
})


export const logoutUser = createAsyncThunk("logouUser", async () => {
    try {
        const LoginUser = await AsyncStorage.getItem(isLogin)
        const readLogiUser = LoginUser ? null : null

        await AsyncStorage.setItem(isLogin, JSON.stringify(readLogiUser))
        console.log(readLogiUser);

        return readLogiUser
    } catch (error) {
        console.log("User error at the logout user");
    }

})


