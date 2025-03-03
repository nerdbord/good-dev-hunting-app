'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    setTheme: (isDarkTheme: boolean) => void;
}

// Default context value
export const ThemeContext = createContext<ThemeContextType>({
    isDarkTheme: true,
    toggleTheme: () => { },
    setTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    const setTheme = (isDark: boolean) => {
        setIsDarkTheme(isDark);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}; 