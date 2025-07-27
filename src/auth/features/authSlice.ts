// src/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface IAuthState {
  accessToken: string | null;
  userState: IUserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  accessToken: null,
  userState: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setUser(state, action: PayloadAction<IUserState>) {
      state.userState = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.userState = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setAccessToken, setUser, logout, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
