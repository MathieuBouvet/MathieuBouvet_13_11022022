import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileRequested } from "../slices/profileSlice";
import authenticator from "../services/authenticator";

function useRequestProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticator.isLoggedIn()) {
      dispatch(profileRequested());
    }
  });
}

export default useRequestProfile;
