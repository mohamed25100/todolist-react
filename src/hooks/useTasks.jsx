import axios from "axios";
import { useEffect, useState } from "react";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    //Charger les tâches à l'initialisation du composant
    useEffect(() => {
        axios
            .get("http://localhost:5000/tasks")
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error de récupération des tâches :", error));
    }, []);

    //Ajouter une tâche
    const addTask = (title, priority) => {
        const newTask = { title, completed: false, priority }; //Création de la nouvelle tâche
        axios
            .post("http://localhost:5000/tasks", newTask)
            .then((response) => setTasks([...tasks, response.data])) //Mise à jour de l'état
            .catch((error) => console.error("Error de l'ajout d'une tâche :", error));
    }

    const toggleTask = (id) => {
        const task = tasks.find((task) => task.id === id);
        const updatedTask = { ...task, completed: !task.completed };
        axios
            .put(`http://localhost:5000/tasks/${id}`, updatedTask)
            .then(() => setTasks(tasks.map((t) => (t.id === id ? updatedTask : t))))
            .catch((error) => console.error("Error lors de la mise à jour de la tâche : ", error));
    }

    const deleteTask = (id) => {
        axios
            .delete(`http://localhost:5000/tasks/${id}`)
            .then(() => setTasks(tasks.filter((task) => task.id !== id))) // Mise à jour de l'état
            .catch((error) => console.error("Erreur lors de la suppression de la tâche :", error));
    };

    return { tasks, addTask, toggleTask, deleteTask };
}

export default useTasks;