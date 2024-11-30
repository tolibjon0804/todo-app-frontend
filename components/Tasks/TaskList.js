import React, { useState, useEffect } from "react";
import API from "../../api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const { data } = await API.get("/tasks");
            const sortedTasks = data.sort((a, b) => {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            setTasks(sortedTasks);
        } catch (error) {
            console.error("Failed to fetch tasks.");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error("Failed to delete task.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.title} ({task.priority})</h3>
                        <p>{task.description}</p>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
