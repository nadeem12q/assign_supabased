import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { signIn, signOut, getCurrentUser, onAuthStateChange } from '../services/supabaseApi';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Timeout wrapper for promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ]);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    let isMounted = true;
    let initTimeout: ReturnType<typeof setTimeout> | null = null;
    
    const initAuth = async () => {
      try {
        // Add 10 second timeout for initial session check
        const userData = await withTimeout(getCurrentUser(), 10000);
        if (isMounted) {
          if (userData) {
            setUser(userData);
          }
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
        // Clear any stale session data on error
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // GUARANTEE: Always clear loading after 15 seconds max
    initTimeout = setTimeout(() => {
      if (isMounted) {
        console.warn("[Auth] Force clearing loading state after 15s safety timeout");
        setIsLoading(false);
      }
    }, 15000);

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const userData = await getCurrentUser();
          if (userData) setUser(userData);
        } catch (err) {
          console.error("Failed to get user after sign in:", err);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      if (initTimeout) clearTimeout(initTimeout);
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // Add 30 second timeout for login operation
      const userData = await withTimeout(signIn(username, password), 30000);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};