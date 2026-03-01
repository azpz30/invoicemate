"use client";

import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";

export function DashboardEmptyState() {
    return (
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
    );
}
