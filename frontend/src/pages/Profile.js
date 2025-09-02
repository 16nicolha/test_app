import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <p style={{ textAlign: "center" }}>You are not logged in.</p>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>User Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
        </div>
    );
}

