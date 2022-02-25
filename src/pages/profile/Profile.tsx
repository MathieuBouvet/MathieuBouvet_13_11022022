import Account from "../../components/account/Account";
import useRequestProfile from "../../hooks/useRequestProfile";
import { useAppSelector } from "../../store";

import "./profile.css";

const Profile = () => {
  useRequestProfile();

  const profile = useAppSelector(state => state.profile.data);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${profile?.firstName} ${profile?.lastName}`}
        </h1>
        <button className="edit-button">Edit Name</button>
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
