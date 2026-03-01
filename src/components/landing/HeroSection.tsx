"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const MockInvoiceCard = () => (
    <div
        className="invoice-preview animate-fade-in animate-delay-300"
        style={{ padding: "28px", position: "relative" }}
    >
        {/* Invoice header */}
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
            }}
        >
            <div>
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        background: "var(--color-accent)",
                        borderRadius: "8px",
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>
                        JM
                    </span>
                </div>
                <div
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--color-text)",
                    }}
                >
                    Jake&apos;s Plumbing
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-3)" }}>
                    ABN 12 345 678 901
                </div>
            </div>
            <div style={{ textAlign: "right" }}>
                <div
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-3)",
                        marginBottom: "4px",
                    }}
                >
                    Invoice
                </div>
                <div
                    style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--color-text)",
                    }}
                >
                    #INV-0042
                </div>
            </div>
        </div>

        {/* Line items */}
        <div
            style={{
                background: "var(--color-surface-2)",
                borderRadius: "var(--radius-md)",
                padding: "14px 16px",
                marginBottom: "16px",
            }}
        >
            {[
                { desc: "Pipe installation — 2hr", qty: "2", price: "$180.00" },
                { desc: "Materials & fittings", qty: "1", price: "$95.00" },
                { desc: "Call-out fee", qty: "1", price: "$80.00" },
            ].map((item, i) => (
                <div key={i} className="invoice-preview-row">
                    <span
                        style={{ fontSize: "0.8125rem", color: "var(--color-text-2)" }}
                    >
                        {item.desc}
                    </span>
                    <span
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--color-text)",
                            fontWeight: 500,
                        }}
                    >
                        {item.price}
                    </span>
                </div>
            ))}
        </div>

        {/* Totals */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
                { label: "Subtotal", value: "$355.00", muted: true },
                { label: "GST (10%)", value: "$35.50", muted: true },
            ].map((row) => (
                <div
                    key={row.label}
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-text-3)" }}>
                        {row.label}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-text-2)" }}>
                        {row.value}
                    </span>
                </div>
            ))}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--color-border)",
                }}
            >
                <span
                    style={{
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        color: "var(--color-text)",
                    }}
                >
                    Total
                </span>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--color-accent)",
                    }}
                >
                    $390.50
                </span>
            </div>
        </div>

        {/* "PAID" stamp */}
        <div
            style={{
                position: "absolute",
                top: "50%",
                right: "28px",
                transform: "translateY(-50%) rotate(-15deg)",
                border: "2px solid var(--color-paid)",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--color-paid)",
                opacity: 0.35,
                letterSpacing: "0.1em",
                pointerEvents: "none",
            }}
        >
            PAID
        </div>
    </div>
);

export default function HeroSection() {
    return (
        <section
            className="grid-bg"
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "100px 0 80px",
            }}
        >
            {/* Glow blobs */}
            <div
                style={{
                    position: "absolute",
                    top: "-100px",
                    left: "10%",
                    width: "600px",
                    height: "400px",
                    pointerEvents: "none",
                }}
            >
                <div
                    className="glow-blue"
                    style={{ width: "100%", height: "100%", animation: "pulse-glow 4s ease-in-out infinite" }}
                />
            </div>

            <div className="page-container">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "64px",
                        alignItems: "center",
                    }}
                    className="hero-grid"
                >
                    {/* Left: copy */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                        {/* Badge */}
                        <div className="gradient-border" style={{ alignSelf: "flex-start" }}>
                            <div className="gradient-border-inner">
                                🇦🇺&nbsp; Built for Australia
                            </div>
                        </div>

                        <h1
                            className="animate-fade-in-up"
                            style={{ margin: 0, color: "var(--color-text)" }}
                        >
                            Simple invoicing
                            <br />
                            <span style={{ color: "var(--color-accent)" }}>
                                for Australian tradies.
                            </span>
                        </h1>

                        <p
                            className="animate-fade-in-up animate-delay-100"
                            style={{ fontSize: "1.125rem", maxWidth: "480px", margin: 0 }}
                        >
                            Create professional GST invoices in seconds. No accounting software.
                            No complexity. Just invoices that get you paid.
                        </p>

                        {/* Trust signals */}
                        <div
                            className="animate-fade-in-up animate-delay-200"
                            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                        >
                            {[
                                "Free to use — no credit card required",
                                "GST-compliant PDF in one click",
                                "ABN & Australian invoice formatting",
                            ].map((item) => (
                                <div
                                    key={item}
                                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                                >
                                    <CheckCircle2
                                        size={15}
                                        style={{ color: "var(--color-success)", flexShrink: 0 }}
                                    />
                                    <span
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "var(--color-text-2)",
                                        }}
                                    >
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div
                            className="animate-fade-in-up animate-delay-300"
                            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                        >
                            <Link
                                href="/signup"
                                className="btn btn-primary btn-lg"
                            >
                                Create free invoice
                                <ArrowRight size={16} />
                            </Link>
                            <Link href="/login" className="btn btn-secondary btn-lg">
                                Sign in
                            </Link>
                        </div>
                    </div>

                    {/* Right: mock invoice */}
                    <div className="hero-preview">
                        <MockInvoiceCard />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-preview {
            order: -1;
          }
        }
      `}</style>
        </section>
    );
}
