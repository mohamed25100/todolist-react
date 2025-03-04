import React, { useState } from "react";

const AddTodoForm = ({ onAddTask }) => {
    const [title, setTitle] = useState(""); //Etat du champ input
    const [priority, setPriority] = useState("basse"); // État de la priorité

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") return; // On vérifie qu'on n'ajoute pas une tâche vide

        onAddTask(title, priority); // On remonte la tâche avec la priorité à App.jsx
        setTitle(""); // Onréinitialise le champ après l'ajout
        setPriority("basse"); // Réinitialisation de la priorité
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ajouter une tâche"
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
            </select>
            <button type="submit">Ajouter</button>
        </form>
    )
}

export default AddTodoForm;