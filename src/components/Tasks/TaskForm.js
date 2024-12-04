import React, { useState } from "react";
import API from "../../api";

const TaskForm = ({ fetchTasks }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: "",
        status: "pending",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/tasks", formData);
            fetchTasks();
            setFormData({ title: "", description: "", deadline: "", status: "pending" });
        } catch (error) {
            alert("Failed to create task.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
