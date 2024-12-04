// import React, { useState, useEffect } from "react";
// import API from "../../api";
// import "./TaskList.css"; // Import the CSS file

// const TaskList = () => {
//     const [tasks, setTasks] = useState([]);

//     const fetchTasks = async () => {
//         try {
//             const { data } = await API.get("/tasks");
//             const sortedTasks = data.sort((a, b) => {
//                 const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//                 return priorityOrder[a.priority] - priorityOrder[b.priority];
//             });
//             setTasks(sortedTasks);
//         } catch (error) {
//             console.error("Failed to fetch tasks.");
//         }
//     };

//     const deleteTask = async (taskId) => {
//         try {
//             await API.delete(`/tasks/${taskId}`);
//             fetchTasks();
//         } catch (error) {
//             console.error("Failed to delete task.");
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     return (
//         <div className="container">
//             <h1>Tasks</h1>
//             <ul className="task-list">
//                 {tasks.map((task) => (
//                     <li key={task._id}>
//                         <h3>
//                             {task.title} <span>({task.priority})</span>
//                         </h3>
//                         <p>{task.description}</p>
//                         <button onClick={() => deleteTask(task._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TaskList;

import React, { useState, useEffect } from "react";
import API from "../../api";
import "./TaskList.css"; // Import the CSS file

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        deadline: "",
    });

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await API.put(`/tasks/${currentTask._id}`, formData);
                setIsEditing(false);
                setCurrentTask(null);
            } else {
                await API.post("/tasks", formData);
            }
            fetchTasks();
            setFormData({ title: "", description: "", priority: "Medium", deadline: "" });
        } catch (error) {
            console.error("Failed to submit task.");
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

    const editTask = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
        setFormData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
        });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <h1>Task Manager</h1>

            <form className="task-form" onSubmit={handleFormSubmit}>
                <h2>{isEditing ? "Edit Task" : "Create Task"}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
                <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
                <button type="submit">{isEditing ? "Update Task" : "Create Task"}</button>
            </form>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>
                            {task.title} <span>({task.priority})</span>
                        </h3>
                        <p>{task.description}</p>
                        <div className="task-actions">
                            <button className="edit-btn" onClick={() => editTask(task)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
