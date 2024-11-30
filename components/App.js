import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TaskList from "./components/Tasks/TaskList";
import TaskForm from "./components/Tasks/TaskForm";

const App = () => {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                {!isAuth ? (
                    <>
                        <Route path="/login" element={<Login setAuth={setAuth} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/new" element={<TaskForm />} />
                        <Route path="*" element={<Navigate to="/tasks" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
