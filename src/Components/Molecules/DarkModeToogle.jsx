import { useState, useEffect, Fragment } from "react";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const renderThemeChanger = () => {
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <button
                    className="h-8 w-8 text-xl text-yellow-500"
                    role="button"
                    onClick={() => setTheme("light")}
                >
                    🌞
                </button>
            );
        } else {
            return (
                <button
                    className="h-8 w-8 text-lg text-gray-900 "
                    role="button"
                    onClick={() => setTheme("dark")}
                >
                    🌙
                </button>
            );
        }
    };
    return <div className="dark-mode-toggle">{renderThemeChanger()}</div>;
};

export default DarkModeToggle;
