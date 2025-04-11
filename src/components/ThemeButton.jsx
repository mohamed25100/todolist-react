import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeButton = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme( theme === 'light-mode' ? 'dark-mode' : 'light-mode');
    }

    return (
        <button onClick={toggleTheme} className="theme-toggle">{theme === "light-mode" ? "🌙 Mode Sombre" : "☀ Mode Clair"}</button>
    );
};
export default ThemeButton;