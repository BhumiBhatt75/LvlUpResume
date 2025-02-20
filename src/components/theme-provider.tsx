"use client"

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface MyThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
}

const MyThemeProvider: React.FC<MyThemeProviderProps> = ({
    children,
    attribute = "class",
    defaultTheme = "light",
    enableSystem = false,
}) => {
    return (
        <NextThemesProvider 
            attribute={attribute} 
            defaultTheme={defaultTheme} 
            enableSystem={enableSystem}
        >
            {children}
        </NextThemesProvider>
    );
};

export default MyThemeProvider; 