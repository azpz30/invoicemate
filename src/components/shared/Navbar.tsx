"use client";

import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
                backgroundColor: scrolled ? "color-mix(in srgb, var(--color-surface) 80%, transparent)" : "transparent",
                transition: "all var(--transition-base)",
            }}
        >
            <div
                className="page-container"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "60px",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src="/logo-light-mode.png"
                            alt="InvoiceMate Logo"
                            width={30}
                            height={30}
                            className="block dark:hidden"
                        />
                        <img
                            src="/logo-dark-mode.png"
                            alt="InvoiceMate Logo"
                            width={30}
                            height={30}
                            className="hidden dark:block"
                        />
                    </div>
                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: "0.9375rem",
                            color: "var(--color-text)",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        InvoiceMate
                        <span style={{ color: "var(--color-text-3)", fontWeight: 400 }}>
                            {" "}AU
                        </span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                    className="hidden sm:flex"
                >
                    <ThemeToggle />
                    <Link href="/login" className="btn btn-ghost btn-sm">
                        Sign in
                    </Link>
                    <Link href="/signup" className="btn btn-primary btn-sm">
                        Get started free
                    </Link>
                </nav>

                {/* Mobile hamburger */}
                <div className="flex items-center gap-2 sm:hidden">
                    <ThemeToggle />
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <Link
                        href="/login"
                        className="btn btn-ghost btn-md"
                        onClick={() => setMobileOpen(false)}
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/signup"
                        className="btn btn-primary btn-md"
                        onClick={() => setMobileOpen(false)}
                    >
                        Get started free
                    </Link>
                </div>
            )}
        </header>
    );
}
