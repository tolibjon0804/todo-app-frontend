import React, { useState } from "react";
import API from "../../api";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/register", formData);
            alert("Registration successful! You can now log in.");
            setFormData({ name: "", email: "", password: "" }); // Reset form
        } catch (error) {
            const errorMessage =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : "Registration failed!";
            alert(errorMessage);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px", margin: "10px 0" }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
