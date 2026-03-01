"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="btn btn-ghost btn-sm" aria-label="Toggle theme" style={{ width: "36px", height: "36px" }}>
                <span style={{ width: "18px", height: "18px" }}></span>
            </button>
        );
    }

    return (
        <button
            className="btn btn-ghost btn-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            style={{ width: "36px", height: "36px", padding: 0 }}
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
