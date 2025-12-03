import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link to="/profile">Profile</Link> |
      <Link to="/users">Users</Link> |
      <Link to="/login">Logout</Link>
    </nav>
  );
};

export default Navbar;
