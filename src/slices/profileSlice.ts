import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

import { profileRoute } from "../config/api/apiRoutes";
import { ProfileResponse } from "../config/api/apiResponses";

import apiClient from "../services/apiClient";

export type UserProfile = {
  firstName: string;
  lastName: string;
};

export type ProfileState = {
  isFetching: boolean;
  hasFetchError: boolean;
  isUpdating: boolean;
  hasUpdateError: boolean;
  data: UserProfile | null;
};

const initialState: ProfileState = {
  isFetching: false,
  hasFetchError: false,
  isUpdating: false,
  hasUpdateError: false,
  data: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.isFetching = false;
      state.hasFetchError = false;
      state.isUpdating = false;
      state.hasUpdateError = false;
      state.data = action.payload;
    },
    fetchErrorOccured: state => {
      state.isFetching = false;
      state.hasFetchError = true;
    },
    resetProfile: state => {
      state.data = initialState.data;
      state.hasFetchError = initialState.hasFetchError;
      state.isFetching = initialState.isFetching;
    },
    fetchStarted: state => {
      state.hasFetchError = false;
      state.isFetching = true;
    },
    updateStarted: state => {
      state.isUpdating = true;
      state.hasUpdateError = false;
    },
    updateErrorOccured: state => {
      state.isUpdating = false;
      state.hasUpdateError = true;
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
        dispatch(fetchErrorOccured());
      }
    }
  };
}

export function profileUpdateRequested(profile: UserProfile) {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStarted());
    try {
      const response = await apiClient.put<ProfileResponse>(
        profileRoute(),
        profile
      );
      const { firstName, lastName } = response.body;
      dispatch(setProfile({ firstName, lastName }));
    } catch (err) {
      dispatch(updateErrorOccured());
      throw err;
    }
  };
}

export const {
  setProfile,
  fetchErrorOccured,
  resetProfile,
  fetchStarted,
  updateErrorOccured,
  updateStarted,
} = profileSlice.actions;

export default profileSlice.reducer;
