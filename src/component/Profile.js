import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux-toolkit/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <>
          <p>Name: {user.first_name} {user.last_name}</p>
          <img src={user.avatar} alt="avatar" width={80} />
        </>
      )}
    </div>
  );
};

export default Profile;
