import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { email: string; username: string };
type RegisteredUser = User & { password: string };

interface AuthState {
  user: User | null;
  users: RegisteredUser[];
  loading: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  users: [],
  loading: true,
};

// Load persisted state
export const loadAuth = createAsyncThunk("auth/loadAuth", async () => {
  const savedUser = await AsyncStorage.getItem("user");
  const savedUsers = await AsyncStorage.getItem("users");

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    users: savedUsers ? JSON.parse(savedUsers) : [],
  };
});

// Register
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }: { username: string; email: string; password: string }, { getState }) => {
    const state = getState() as { auth: AuthState };

    if (state.auth.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User with this email already exists");
    }

    const newUser: RegisteredUser = { email, username, password };
    const updatedUsers = [...state.auth.users, newUser];

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { getState }) => {
    const state = getState() as { auth: AuthState };

    const foundUser = state.auth.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid Email or Password");
    }

    const userData = { email: foundUser.email, username: foundUser.username };
    await AsyncStorage.setItem("user", JSON.stringify(userData));

    return userData;
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await AsyncStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.users = action.payload.users;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
