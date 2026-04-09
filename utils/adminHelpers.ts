
/**
 * Shared admin utility functions — used by multiple admin components
 */

/** Returns a color based on submission percentage */
export const getProgressColor = (pct: number): string => {
    if (pct >= 80) return '#10b981';
    if (pct >= 50) return 'var(--color-accent)';
    return '#f59e0b';
};

/** Status display config — shared between AssignmentProgress and AssignmentHistoryModal */
export const statusConfig = {
    active: {
        color: '#10b981',
        bg: 'rgba(16,185,129,0.12)',
        border: 'rgba(16,185,129,0.25)',
        label: '🟢 Active',
        glow: '0 0 12px rgba(16,185,129,0.3)',
        text: '#34d399',
    },
    inactive: {
        color: '#64748b',
        bg: 'rgba(100,116,139,0.12)',
        border: 'rgba(100,116,139,0.25)',
        label: '⚪ Inactive',
        glow: 'none',
        text: '#94a3b8',
    },
    expired: {
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.12)',
        border: 'rgba(239,68,68,0.25)',
        label: '🔴 Expired',
        glow: '0 0 12px rgba(239,68,68,0.3)',
        text: '#f87171',
    },
};
