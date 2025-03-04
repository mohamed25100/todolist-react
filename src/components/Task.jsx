const Task = ({ task, onToggle, onDelete }) => {
    return <tr
        onClick={() => onToggle(task.id)}
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
    >
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>{task.completed ? "yes" : "no"}</td>
        <td>{task.priority}</td>
        <td><button onClick={() => onDelete(task.id)}>delete</button></td>
    </tr>;
}

export default Task;