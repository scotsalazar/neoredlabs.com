import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const THEME_STORAGE_KEY = 'neolabs-theme';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

const getStoredTheme = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return value === 'light' || value === 'dark' ? value : null;
};

const getSystemTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getInitialThemeState = () => {
  const storedTheme = getStoredTheme();
  return {
    theme: storedTheme || getSystemTheme(),
    hasStoredPreference: Boolean(storedTheme)
  };
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getInitialThemeState().theme);
  const [hasStoredPreference, setHasStoredPreference] = useState(() => getInitialThemeState().hasStoredPreference);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (hasStoredPreference || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncWithSystem = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncWithSystem);
      return () => mediaQuery.removeEventListener('change', syncWithSystem);
    }

    mediaQuery.addListener(syncWithSystem);
    return () => mediaQuery.removeListener(syncWithSystem);
  }, [hasStoredPreference]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
    setHasStoredPreference(true);
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
