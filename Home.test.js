import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./src/components/Home";

test ('Affiche correctement le texte', () => {
    render(<Home />);
    const textElement = screen.getByText(/Bienvenue sur mon application ToDo List/);
    expect(textElement).toBeInTheDocument();
})