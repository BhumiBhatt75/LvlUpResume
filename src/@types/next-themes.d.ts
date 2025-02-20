declare module 'next-themes' {
    import { FC } from 'react';

    export interface ThemeProviderProps {
        attribute?: string;
        defaultTheme?: string;
        enableSystem?: boolean;
        children: React.ReactNode;
    }

    export const ThemeProvider: FC<ThemeProviderProps>;
    export const useTheme: () => {
        theme: string;
        setTheme: (theme: string) => void;
        resolvedTheme: string;
    };
} 