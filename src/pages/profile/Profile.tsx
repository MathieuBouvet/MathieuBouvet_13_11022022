import { useState } from "react";

import { useAppSelector } from "../../store";
import useRequestProfile from "../../hooks/useRequestProfile";

import { UserProfile } from "../../slices/profileSlice";

import EditProfile from "./EditProfile";
import Account from "../../components/account/Account";

import "./profile.css";

function getValidName(profile: UserProfile | null): string {
  if (profile === null) {
    return getValidName({ lastName: "", firstName: "" });
  }
  const { firstName, lastName } = profile;
  const validFirstName = firstName.length !== 0 ? firstName : "Mr.";
  const validLastName =
    lastName.length === 0 && firstName.length === 0 ? "Anonymous" : lastName;
  return `${validFirstName} ${validLastName}`;
}

const Profile = () => {
  useRequestProfile();

  const profile = useAppSelector(state => state.profile.data);

  const [profileView, setProfileView] = useState<"display" | "edition">(
    "display"
  );

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profileView === "edition" ? (
            <EditProfile
              initialFirstName={profile?.firstName ?? ""}
              initalLastName={profile?.lastName ?? ""}
              onStopEdition={() => setProfileView("display")}
            />
          ) : (
            getValidName(profile)
          )}
        </h1>
        {profileView === "display" && (
          <button
            className="edit-button"
            onClick={() => setProfileView("edition")}
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount={2082.79}
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount={10928.42}
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount={184.3}
        description="Current Balance"
      />
    </main>
  );
};

export default Profile;
