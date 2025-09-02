import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const handleChoice = async (tier) => {
        try {
            const res = await fetch(`http://localhost:5000/recommendations?tier=${tier}`);
            const data = await res.json();
            setRecommendations(data);
            setDropdownOpen(false);
        } catch (err) {
            console.error("Error fetching recommendations:", err);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Ghastly</h2>
            </nav>

            {/* Greeting */}
            <header style={styles.header}>
                <h1>Welcome to Ghastly</h1>
            </header>

            {/* Dropdown Menu */}
            <div style={styles.dropdownContainer}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={styles.dropdownButton}
                >
                    Choose your preference ▼
                </button>
                {dropdownOpen && (
                    <ul style={styles.dropdownMenu}>
                        <li style={styles.dropdownItem} onClick={() => handleChoice(1)}>Scary, but not too brutal</li>
                        <li style={styles.dropdownItem} onClick={() => handleChoice(2)}>I can handle more</li>
                        <li style={styles.dropdownItem} onClick={() => handleChoice(3)}>I want to be traumatized</li>
                    </ul>
                )}
            </div>

            {/* Recommendation Cards */}
            <div style={styles.cardsContainer}>
                {recommendations.map((item, index) => (
                    <div key={index} style={styles.card}>
                        {/* Thumbnail */}
                        {item.thumbnail && (
                            <img
                                src={item.thumbnail}
                                alt={item.title || "thumbnail"}
                                style={styles.thumbnail}
                            />
                        )}

                        {/* Title */}
                        <h3>{item.title || item.name || "Untitled"}</h3>

                        {/* Type */}
                        {item.type && <p><strong>{item.type}</strong></p>}

                        {/* Description */}
                        {item.blurb && <p>{item.blurb}</p>}

                        {/* Link */}
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.linkText}
                            >
                                {item.link}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Inline styles
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
    link: { color: "white", textDecoration: "none" },
    header: { textAlign: "center", marginTop: "50px" },
    dropdownContainer: { textAlign: "center", marginTop: "30px" },
    dropdownButton: {
        padding: "10px 20px",
        background: "#444",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    dropdownMenu: {
        listStyle: "none",
        padding: 0,
        margin: "10px auto",
        background: "#eee",
        width: "250px",
        border: "1px solid #ccc"
    },
    dropdownItem: {
        padding: "10px",
        borderBottom: "1px solid #ccc",
        cursor: "pointer"
    },
    cardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
        gap: "20px",
        margin: "40px auto",
        maxWidth: "1000px"
    },
    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    thumbnail: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px"
    },
    linkText: {
        color: "#1a0dab",
        textDecoration: "underline",
        wordBreak: "break-word" // makes long URLs wrap instead of overflow
    }
};
