import React, { useState } from "react";
import API from "../../api";

const Login = ({ setAuth }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/login", formData);
            localStorage.setItem("token", data.token);
            setAuth(true);
        } catch (error) {
            alert("Login failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
