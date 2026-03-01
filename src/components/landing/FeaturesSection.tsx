"use client";

import { Box, FileText, PieChart, Shield, Zap, Smartphone, Flag } from "lucide-react";

const features = [
    {
        icon: <Zap size={20} />,
        title: "Create invoices in seconds",
        description:
            "Add line items, set quantities and prices. GST, subtotal and totals are auto-calculated instantly as you type.",
    },
    {
        icon: <Flag size={20} />,
        title: "Built for Australia",
        description:
            "ABN fields, 10% GST breakdown, and proper Australian invoice formatting baked right in.",
    },
    {
        icon: <Smartphone size={20} />,
        title: "Mobile friendly",
        description:
            "Create and download invoices directly from your phone. Works perfectly on any device, any screen size.",
    },
];

export default function FeaturesSection() {
    return (
        <section style={{ padding: "96px 0" }}>
            <div className="page-container">
                {/* Header */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "64px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <div className="section-label" style={{ textAlign: "center" }}>
                        Features
                    </div>
                    <h2 style={{ margin: 0 }}>
                        Everything you need.
                        <br />
                        <span style={{ color: "var(--color-text-2)", fontWeight: 400 }}>
                            Nothing you don&apos;t.
                        </span>
                    </h2>
                    <p style={{ maxWidth: "480px", margin: "0 auto" }}>
                        InvoiceMate is laser-focused on one thing: helping Australian tradies
                        get paid faster with professional invoices.
                    </p>
                </div>

                {/* Feature cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                    }}
                    className="features-grid"
                >
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="card card-hover"
                            style={{
                                padding: "28px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                                animationDelay: `${i * 100}ms`,
                            }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    background: "var(--color-accent-muted)",
                                    border: "1px solid rgba(94,106,210,0.2)",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--color-accent)",
                                }}
                            >
                                {f.icon}
                            </div>

                            <div>
                                <h3
                                    style={{
                                        margin: "0 0 8px 0",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: "1.6" }}>
                                    {f.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
