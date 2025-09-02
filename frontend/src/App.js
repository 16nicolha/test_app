import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const signIn = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
      <Router>
        <Routes>
          {/* Fix: root route now loads Home */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
  );
}

export default App;
