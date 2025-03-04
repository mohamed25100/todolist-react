import React from "react";
import Task from "./Task";


const ToDoList = ({ tasks, onToggle, onDelete }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>completed</th>
          <th>priority</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  )
};

export default ToDoList;
