import { createContext, useState} from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light-mode');

    return (
        <ThemeContext.Provider value= {{theme, setTheme}} >{children}</ThemeContext.Provider>
    );
};

export {ThemeProvider,ThemeContext}