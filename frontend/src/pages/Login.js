import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully!");
        } catch (error) {
            alert("Error logging in: " + error.message);
        }
    };

    return (
        <div>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Ghastly</h2>
                <div style={styles.links}>
                    <Link to="/Home" style={styles.link}>Home</Link>
                    {!user && <Link to="/Login" style={styles.link}>Login</Link>}
                </div>
                {user && <span style={{ color: "white" }}>Logged in as {user.email}</span>}
            </nav>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Login Page</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
                <p style={{ marginTop: "20px" }}>
                    Don't have an account? <Link to="/Signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#222",
        color: "white"
    },
    logo: { margin: 0 },
    links: { display: "flex", gap: "15px" },
    link: { color: "white", textDecoration: "none" }
};

export default Login;
