import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import { ThemeContext } from "./src/context/ThemeContext";
import ToDoPage from "./src/components/ToDoPage";


// Mock d'Axios
jest.mock("axios");

describe("ToDoPage", () => {
    beforeEach(() => {
        // Mock de la reponse d'Axios pour la récupération des tâches
        axios.get.mockResolvedValue({
            data: [
                { id: 1, title: "Tâche mockée", completed: false, preority: "Haute" },
                { id: 2, title: "Autre tâche", completed: false, priority: "Basse" }
            ]
        })
    })
})

test("affiche correctement le titre", async () => {
    render(
        <ThemeContext.Provider value={{ theme: "light-mode" }}>
            <ToDoPage />
        </ThemeContext.Provider>
    );

    // Vérifie que le titre 'ToDo List' est dans le document
    expect(screen.getByText(/ToDo List/i)).toBeInTheDocument();

});

test("affiche Correctement les tâches après récupération", async () => {
    render(
        <ThemeContext.Provider value={{ theme: "light-mode" }}>
            <ToDoPage />
        </ThemeContext.Provider>
    );

    // Attendre que l'appel Axios et le rendu des tâches soient terminés
    await waitFor(() => {
        expect(screen.getByText("Tâche mockée")).toBeInTheDocument();
        expect(screen.getByText("Autre tâche")).toBeInTheDocument();
    });


});

test("change le filter de priorité", async () => {
    render(
        <ThemeContext.Provider value={{ theme: "light" }}>
            <ToDoPage />
        </ThemeContext.Provider>
    );

    //Attendre que les tâches soient chargées
    await waitFor(() => screen.getByText("Tâche mockée"));

    // On change le filtre 
    await act(async () => {
        const filterSelect = screen.getByRole("combobox", { name: /filtrer par priorité/i });
        fireEvent.change(filterSelect, { target: { value: "Haute" } });
    })

    expect(screen.getByText("Tâche mockée")).toBeInTheDocument();//Doit être affichée
    expect(screen.getByText("Autre tâche")).not.toBeInTheDocument();// Ne doit pas être affichée
})