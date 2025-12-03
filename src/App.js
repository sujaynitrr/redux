// import React from "react";
// import Counter from "./component/Counter";
// import CounterToolkit from "./component/CounterToolkit";

// const App = () => {
//   return <>
//   <Counter/>
//   <CounterToolkit/>
//   </>
// };

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./component/Login";
import Profile from "./component/Profile";
import UsersList from "./component/UsersList";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Navbar from "./Pages/Navbar";
// import Layout from "./Layout";

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Area with Navbar */}
      {/* <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UsersList />} />
      </Route> */}

      {/* Default */}
      <Route path="*" element={<Login />} />
    </Routes>
    </>
    
  );
}

export default App;
