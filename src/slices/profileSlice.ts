import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

import { profileRoute } from "../config/api/apiRoutes";
import { ProfileResponse } from "../config/api/apiResponses";

import apiClient from "../services/apiClient";

type UserProfile = {
  firstName: string;
  lastName: string;
};

export type ProfileState = {
  isFetching: boolean;
  hasError: boolean;
  data: UserProfile | null;
};

const initialState: ProfileState = {
  isFetching: false,
  hasError: false,
  data: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.isFetching = false;
      state.hasError = false;
      state.data = action.payload;
    },
    errorOccured: state => {
      state.isFetching = false;
      state.hasError = true;
    },
    resetProfile: state => {
      state.data = initialState.data;
      state.hasError = initialState.hasError;
      state.isFetching = initialState.isFetching;
    },
    fetchStarted: state => {
      state.hasError = false;
      state.isFetching = true;
    },
  },
});

export function profileRequested() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { isFetching, data } = getState().profile;
    if (!isFetching && data === null) {
      dispatch(fetchStarted());
      try {
        const response = await apiClient.post<ProfileResponse>(
          profileRoute(),
          {}
        );
        const { firstName, lastName } = response.body;
        dispatch(setProfile({ firstName, lastName }));
      } catch (err) {
        dispatch(errorOccured());
      }
    }
  };
}

export const { setProfile, errorOccured, resetProfile, fetchStarted } =
  profileSlice.actions;

export default profileSlice.reducer;
