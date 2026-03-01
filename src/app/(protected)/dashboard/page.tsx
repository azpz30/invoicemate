"use client";

import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";

// Stub empty state — Phase 2 will populate this from the API
export default function DashboardPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "16px",
                }}
            >
                <div>
                    <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>Dashboard</h1>
                    <p style={{ margin: 0, fontSize: "0.875rem" }}>
                        Manage your invoices and business
                    </p>
                </div>
                <Link href="/invoice/new" className="btn btn-primary btn-md">
                    <PlusCircle size={16} />
                    New Invoice
                </Link>
            </div>

            {/* Stats row (placeholder) */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                }}
                className="stats-grid"
            >
                {[
                    { label: "Total invoiced", value: "$0.00" },
                    { label: "Invoices sent", value: "0" },
                    { label: "Awaiting payment", value: "$0.00" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="card"
                        style={{ padding: "20px 24px" }}
                    >
                        <div
                            style={{
                                fontSize: "0.75rem",
                                color: "var(--color-text-3)",
                                marginBottom: "8px",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            {stat.label}
                        </div>
                        <div
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "var(--color-text)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent invoices */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
                        Recent Invoices
                    </h2>
                </div>

                {/* Empty state */}
                <div
                    className="card"
                    style={{
                        padding: "64px 32px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            background: "var(--color-surface-2)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--color-text-3)",
                        }}
                    >
                        <FileText size={22} />
                    </div>
                    <div>
                        <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem", fontWeight: 600 }}>
                            No invoices yet
                        </h3>
                        <p style={{ margin: 0, fontSize: "0.875rem" }}>
                            Create your first invoice to get started.
                        </p>
                    </div>
                    <Link href="/invoice/new" className="btn btn-primary btn-md">
                        <PlusCircle size={15} />
                        Create your first invoice
                    </Link>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
