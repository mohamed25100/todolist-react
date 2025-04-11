import { Link } from "react-router";
import TaskCounter from "./TaskCounter";
import ThemeButton from "./ThemeButton";
import useTasks from "../hooks/useTasks";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PriorityFilter from "./PriorityFilter";
import AddTodoForm from "./AddTodoForm";
import ToDoList from "./ToDoList";

const ToDoPage = () => {
    // STATS
    const { tasks, addTask, toggleTask, deleteTask } = useTasks();
    const [filterPriority, setFilterPriority] = useState("Toutes");
    const filteredTasks = filterPriority === "Toutes" ?
        tasks : tasks.filter(task => task.priority === filterPriority)
    const { theme } = useContext(ThemeContext);

    //Charger les taches lorsque la preorité change
    const handleFilterChange = (e) => {
        setFilterPriority(e.target.value);
    }
    return (
        <div className={`app ${theme}`}>
            <Link to="/about">Cliquez ici pour naviguer vers la page "About"</Link>
            <h1>ToDo List</h1>

            <div>
                <TaskCounter tasks={tasks} />
                <ThemeButton />
            </div>

            <PriorityFilter filterPriority={filterPriority} onPriorityChange={handleFilterChange} />

            <AddTodoForm onAddTask={addTask} />
            <ToDoList tasks={filteredTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
            />
        </div>
    )
}

export default ToDoPage;