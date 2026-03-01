"use client";

import { useState } from "react";


import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Building2,
    LogOut,
    PlusCircle,
    Menu,
    X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "New Invoice", href: "/invoice/new", icon: PlusCircle },
    { label: "Business Profile", href: "/profile", icon: Building2 },
];

const SidebarContent = ({
    pathname,
    setMobileOpen,
    handleLogout
}: {
    pathname: string;
    setMobileOpen: (open: boolean) => void;
    handleLogout: () => void;
}) => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "16px 12px",
        }}
    >
        {/* Logo */}
        <Link
            href="/dashboard"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                marginBottom: "24px",
                textDecoration: "none",
            }}
            onClick={() => setMobileOpen(false)}
        >
            <div
                style={{
                    width: "28px",
                    height: "28px",
                    background: "var(--color-accent)",
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <FileText size={14} color="#fff" />
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
            </span>
        </Link>

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
            {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${active ? "nav-item-active" : ""}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        <item.icon size={16} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        {/* Logout */}
        <button
            onClick={handleLogout}
            className="nav-item"
            style={{
                background: "none",
                border: "none",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
            }}
        >
            <LogOut size={16} />
            Sign out
        </button>
    </div>
);

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
    };


    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)" }}>
            {/* Desktop sidebar */}
            <aside
                className="desktop-sidebar"
                style={{
                    width: "220px",
                    flexShrink: 0,
                    background: "var(--color-surface)",
                    borderRight: "1px solid var(--color-border)",
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                }}
            >
                <SidebarContent pathname={pathname} setMobileOpen={setMobileOpen} handleLogout={handleLogout} />
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        zIndex: 40,
                        backdropFilter: "blur(4px)",
                    }}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile sidebar drawer */}
            <aside
                className="mobile-sidebar"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "260px",
                    background: "var(--color-surface)",
                    borderRight: "1px solid var(--color-border)",
                    zIndex: 50,
                    transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.25s ease",
                }}
            >
                <SidebarContent pathname={pathname} setMobileOpen={setMobileOpen} handleLogout={handleLogout} />
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                {/* Mobile top bar */}
                <header
                    className="mobile-header"
                    style={{
                        display: "none",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 16px",
                        height: "56px",
                        borderBottom: "1px solid var(--color-border)",
                        background: "var(--color-surface)",
                        position: "sticky",
                        top: 0,
                        zIndex: 30,
                    }}
                >
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="btn btn-ghost btn-sm"
                        style={{ border: "none" }}
                        aria-label="Open menu"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                            style={{
                                width: "24px",
                                height: "24px",
                                background: "var(--color-accent)",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FileText size={12} color="#fff" />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text)" }}>
                            InvoiceMate
                        </span>
                    </div>

                    <Link href="/invoice/new" className="btn btn-primary btn-sm">
                        <PlusCircle size={14} />
                        New
                    </Link>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: "32px" }}>
                    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                        {children}
                    </div>
                </main>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
        }
      `}</style>
        </div>
    );
}
