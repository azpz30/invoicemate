"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                padding: "40px 0",
                marginTop: "auto",
            }}
        >
            <div className="page-container">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                        textAlign: "center",
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                            style={{
                                width: "26px",
                                height: "26px",
                                borderRadius: "6px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                src="/logo-light-mode.png"
                                alt="InvoiceMate Logo"
                                width={26}
                                height={26}
                                className="block dark:hidden"
                            />
                            <Image
                                src="/logo-dark-mode.png"
                                alt="InvoiceMate Logo"
                                width={26}
                                height={26}
                                className="hidden dark:block"
                            />
                        </div>
                        <span
                            style={{
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                color: "var(--color-text)",
                            }}
                        >
                            InvoiceMate AU
                        </span>
                    </div>

                    {/* Links */}
                    <nav style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
                        {[
                            { label: "Privacy Policy", href: "/privacy" },
                            { label: "Terms of Service", href: "/terms" },
                            { label: "Contact", href: "mailto:hello@invoicemate.com.au" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                style={{
                                    fontSize: "0.8125rem",
                                    color: "var(--color-text-3)",
                                    textDecoration: "none",
                                    transition: "color var(--transition-fast)",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "var(--color-text-2)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "var(--color-text-3)")
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p
                        style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-3)",
                            margin: 0,
                        }}
                    >
                        © {new Date().getFullYear()} InvoiceMate AU. Made for Australian tradies.
                    </p>
                </div>
            </div>
        </footer>
    );
}
