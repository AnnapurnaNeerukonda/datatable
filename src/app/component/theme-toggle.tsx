// components/ThemeToggle.tsx
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@shadcn/ui';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
