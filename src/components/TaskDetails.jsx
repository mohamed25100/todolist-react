import { useParams } from "react-router"

const TaskDetails = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Détails du produit {id} </h1>
        </div>
    )
};

export default TaskDetails;