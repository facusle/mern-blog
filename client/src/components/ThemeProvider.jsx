import React from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
     const { currentTheme } = useSelector((state) => state.theme);
     return (
          <div className={currentTheme}>
               <div className="text-gray-700 bg-white dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">{children}</div>
          </div>
     );
}
