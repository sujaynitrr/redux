import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux-toolkit/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
