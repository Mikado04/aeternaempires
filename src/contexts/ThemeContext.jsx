import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext(undefined)

export function ThemeProvider({children}){
    const [theme, setTheme] = useState(() =>{
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        :'light';
    })

    useEffect(() =>{
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme doit être utilisé à l\'intérieur de ThemeProvider');
    return context;
}