import React, { useState } from "react";
import API from "../../api";

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await API.post("/login", {username, password});
            
            localStorage.setItem("token", `Bearer ${data.data.access_token}`);
            
            console.log(data.data)

            setAuth(true);
        } catch (error) {
            alert(`${error}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Usename"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
    heading: {
        marginBottom: "20px",
        color: "#333",
        fontSize: "24px",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        margin: "10px 0",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        boxSizing: "border-box",
    },
    button: {
        marginTop: "10px",
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default Login;
