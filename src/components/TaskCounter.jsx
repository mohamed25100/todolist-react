import { useMemo } from "react";
import React from "react";

const TaskCounter = ({tasks}) => {
    const remainingTasks = useMemo( () => 
    tasks.filter(task => !task.completed).length,
    [tasks]
    );

    return <h2> Taches restantes : {remainingTasks}</h2>
}

export default React.memo(TaskCounter);