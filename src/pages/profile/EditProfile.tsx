import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";

import { profileUpdateRequested } from "../../slices/profileSlice";

import "./profile.css";

interface Props {
  initialFirstName: string;
  initalLastName: string;
  onStopEdition: () => void;
}

const EditProfile = ({
  initialFirstName,
  initalLastName,
  onStopEdition,
}: Props) => {
  const dispatch = useDispatch();

  const isEditingProfile = useAppSelector(state => state.profile.isUpdating);
  const hasUpdateError = useAppSelector(state => state.profile.hasUpdateError);

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initalLastName);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await dispatch(profileUpdateRequested({ firstName, lastName }));
      onStopEdition();
    } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <input
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        className="profile-form-input profile-form-left-column"
      ></input>
      <input
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        className="profile-form-input .profile-form-right-column"
      ></input>
      <button
        type="submit"
        className="profile-form-button save profile-form-left-column"
      >
        save
      </button>
      <button
        onClick={onStopEdition}
        type="button"
        className="profile-form-button cancel .profile-form-right-column"
      >
        cancel
      </button>
      {isEditingProfile && (
        <p className="profile-form-message">
          <i className="fa fa-spinner fa-spin spin-icon" />
          Updating profile
        </p>
      )}
      {hasUpdateError && (
        <p className="profile-form-message error">
          An error occured when trying to update your profile. Please try again
          later.
        </p>
      )}
    </form>
  );
};

export default EditProfile;
