import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux-toolkit/authSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const { usersList, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (isLoading) return <p>Loading users...</p>;

  return (
    <ul>
      {usersList.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
