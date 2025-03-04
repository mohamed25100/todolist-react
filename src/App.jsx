import { useEffect, useState } from 'react';
import ToDoList from './components/ToDoList';
import AddTodoForm from './components/AddTodoForm';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const incompleteTasks = tasks.filter(task => !task.completed).length; // Compteur de tâches incomplètes
  const [filterPriority, setFilterPriority] = useState("toutes"); // Ajout du filtre
  const [darkMode, setDarkMode] = useState(false); // État du mode sombre

  //Charger les tâches à l'initialisation du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error de récupération des tâches :", error));
  }, []);

  //Ajouter une tâche
  const handleAddTask = (title, priority) => {
    const newTask = { title, completed: false, priority }; //Création de la nouvelle tâche
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => setTasks([...tasks, response.data])) //Mise à jour de l'état
      .catch((error) => console.error("Error de l'ajout d'une tâche :", error));
  }

  const handleToggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    const updatedTask = { ...task, completed: !task.completed };
    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(() => setTasks(tasks.map((t) => (t.id === id ? updatedTask : t))))
      .catch((error) => console.error("Error lors de la mise à jour de la tâche : ", error));
  }

  const handleOnDelete = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id))) // Mise à jour de l'état
      .catch((error) => console.error("Erreur lors de la suppression de la tâche :", error));
  };

  // Filtrer les tâches en fonction de la priorité sélectionnée
  const filteredTasks = filterPriority === "toutes" ? tasks : tasks.filter(task => task.priority === filterPriority);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀ Mode Clair" : "🌙 Mode Sombre"}
      </button>
      <h1>ToDoList</h1>
      <p>📌 Tâches restantes : {incompleteTasks}</p> {/* Affichage du compteur */}
      <AddTodoForm onAddTask={handleAddTask} />
      <label>Filtrer par priorité : </label>
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="toutes">Toutes</option>
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>
      <ToDoList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleOnDelete} />
    </div>
  )
};

export default App;
