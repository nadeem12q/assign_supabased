import React, { createContext, useContext, useState, useEffect } from 'react';

export type Mode = 'dark' | 'light';
export type Accent = 'midnight' | 'nebula' | 'solaris' | 'arcane' | 'ember';

export interface AccentOption {
    id: Accent;
    label: string;
    color: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
    { id: 'midnight', label: 'Midnight Azure', color: '#3b82f6' },
    { id: 'nebula', label: 'Nebula Nocturne', color: '#a78bfa' },
    { id: 'solaris', label: 'Solaris Dawn', color: '#f59e0b' },
    { id: 'arcane', label: 'Arcane Depths', color: '#06b6d4' },
    { id: 'ember', label: 'Ember Blaze', color: '#ef4444' },
];

interface ThemeState {
    mode: Mode;
    accent: Accent;
    cursorSpotlight: boolean;
    spotlightIntensity: number;
}

interface ThemeContextType {
    theme: Mode;
    accent: Accent;
    cursorSpotlight: boolean;
    spotlightIntensity: number;
    toggleTheme: () => void;
    setAccent: (accent: Accent) => void;
    toggleCursorSpotlight: () => void;
    setSpotlightIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    accent: 'midnight',
    cursorSpotlight: true,
    spotlightIntensity: 0.15,
    toggleTheme: () => { },
    setAccent: () => { },
    toggleCursorSpotlight: () => { },
    setSpotlightIntensity: () => { },
});

const STORAGE_KEY = 'assignportal-theme';

function loadThemeState(): ThemeState {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                mode: parsed.mode || 'dark',
                accent: parsed.accent || 'midnight',
                cursorSpotlight: parsed.cursorSpotlight !== false,
                spotlightIntensity: parsed.spotlightIntensity ?? 0.15,
            };
        }
    } catch { }
    // Legacy support: check old 'theme' key
    const legacyTheme = localStorage.getItem('theme');
    return {
        mode: (legacyTheme as Mode) || 'dark',
        accent: 'midnight',
        cursorSpotlight: true,
        spotlightIntensity: 0.15,
    };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<ThemeState>(loadThemeState);

    const toggleTheme = () => {
        setState(prev => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' }));
    };

    const setAccent = (accent: Accent) => {
        setState(prev => ({ ...prev, accent }));
    };

    const toggleCursorSpotlight = () => {
        setState(prev => ({ ...prev, cursorSpotlight: !prev.cursorSpotlight }));
    };

    const setSpotlightIntensity = (intensity: number) => {
        setState(prev => ({ ...prev, spotlightIntensity: intensity }));
    };

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', state.mode);
        root.setAttribute('data-mode', state.mode);
        root.setAttribute('data-accent', state.accent);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return (
        <ThemeContext.Provider value={{
            theme: state.mode,
            accent: state.accent,
            cursorSpotlight: state.cursorSpotlight,
            spotlightIntensity: state.spotlightIntensity,
            toggleTheme,
            setAccent,
            toggleCursorSpotlight,
            setSpotlightIntensity,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
