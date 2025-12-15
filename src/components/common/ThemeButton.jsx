import React, { forwardRef } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeButton = forwardRef(
  ({ handleDark, isDark, size, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={handleDark}
        aria-label="Toggle Theme Mode"
        className={`${className}`}
      >
        {isDark ? (
          <Sun size={size} color="gold"></Sun>
        ) : (
          <Moon size={size} color="purple"></Moon>
        )}
      </button>
    );
  }
);

export default ThemeButton;
