import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent page refresh
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created! You are now logged in.");
            navigate("/Home"); // Redirect to home after signup
        } catch (error) {
            alert("Error signing up: " + error.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
