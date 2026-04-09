import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const CursorSpotlight: React.FC = () => {
    const { cursorSpotlight, spotlightIntensity } = useTheme();
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorSpotlight) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(var(--color-accent-rgb), ${spotlightIntensity}), transparent 40%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorSpotlight, spotlightIntensity]);

    if (!cursorSpotlight) return null;

    return (
        <div
            ref={spotlightRef}
            className="cursor-spotlight"
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'background 0.15s ease-out',
            }}
        />
    );
};

export default CursorSpotlight;
