export const CONFIG = {
  // App Mode
  APP_MODE: import.meta.env.VITE_APP_MODE || 'supabase',

  // File Upload Config
  MAX_FILE_SIZE_MB: Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) || 25,
};