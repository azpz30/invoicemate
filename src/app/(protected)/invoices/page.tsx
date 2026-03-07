"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { Invoice } from "@/types";
import { FileText, ArrowUpDown, Plus, Download } from "lucide-react";

type SortField = "created_at" | "total" | "client_name" | "status";
type SortDir = "asc" | "desc";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState<SortField>("created_at");
    const [sortDir, setSortDir] = useState<SortDir>("desc");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const json = await fetchAPI("invoices");
                setInvoices(json?.data || []);
            } catch (err) {
                console.error("Failed to load invoices", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    function toggleSort(field: SortField) {
        if (sortField === field) {
            setSortDir(d => d === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDir("desc");
        }
    }

    async function toggleStatus(inv: Invoice) {
        const newStatus = inv.status === "draft" ? "paid" : "draft";
        try {
            await fetchAPI(`invoices/${inv.id}/status`, {
                method: "PUT",
                body: JSON.stringify({ status: newStatus }),
            });
            setInvoices(prev => prev.map(i =>
                i.id === inv.id ? { ...i, status: newStatus as "draft" | "paid" } : i
            ));
        } catch (err) {
            console.error("Failed to update status", err);
        }
    }

    async function viewPDF(inv: Invoice) {
        try {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
            const res = await fetch(`${API_BASE}/invoices/${inv.id}/pdf`, {
                headers: { Authorization: `Bearer ${session.access_token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch PDF");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (err) {
            console.error("Failed to open PDF", err);
        }
    }

    const filtered = invoices
        .filter(inv => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
                inv.invoice_number.toLowerCase().includes(q) ||
                (inv.client_name?.toLowerCase().includes(q)) ||
                inv.total.toString().includes(q)
            );
        })
        .sort((a, b) => {
            let cmp = 0;
            if (sortField === "created_at") {
                cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            } else if (sortField === "total") {
                cmp = a.total - b.total;
            } else if (sortField === "client_name") {
                cmp = (a.client_name || "").localeCompare(b.client_name || "");
            } else if (sortField === "status") {
                cmp = a.status.localeCompare(b.status);
            }
            return sortDir === "asc" ? cmp : -cmp;
        });

    function SortHeader({ field, children }: { field: SortField; children: React.ReactNode }) {
        return (
            <button
                type="button"
                onClick={() => toggleSort(field)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: 0,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: sortField === field ? "var(--color-text-1)" : "var(--color-text-3)",
                }}
            >
                {children}
                <ArrowUpDown size={12} />
            </button>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
            }}>
                <div>
                    <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>Invoice History</h1>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                        View and manage all your invoices
                    </p>
                </div>
                <Link href="/invoice/new" className="btn btn-primary btn-md" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Plus size={16} />
                    New Invoice
                </Link>
            </div>

            {/* Search */}
            <input
                type="text"
                className="input"
                placeholder="Search by invoice number, client, or amount..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: "400px" }}
            />

            {/* Table */}
            {loading ? (
                <div className="card" style={{ padding: "48px", textAlign: "center" }}>
                    <p style={{ margin: 0, color: "var(--color-text-3)" }}>Loading invoices...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="card" style={{
                    padding: "64px 32px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                }}>
                    <div style={{
                        width: "52px",
                        height: "52px",
                        background: "var(--color-surface-2)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-text-3)",
                    }}>
                        <FileText size={22} />
                    </div>
                    <div>
                        <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>
                            {search ? "No invoices match your search" : "No invoices yet"}
                        </h3>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                            {search ? "Try a different search term." : "Create your first invoice to get started."}
                        </p>
                    </div>
                    {!search && (
                        <Link href="/invoice/new" className="btn btn-primary btn-md">
                            Create Invoice
                        </Link>
                    )}
                </div>
            ) : (
                <div className="card" style={{ overflow: "hidden" }}>
                    {/* Table Header */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "100px 1fr 120px 100px 100px 60px",
                        gap: "12px",
                        padding: "12px 20px",
                        borderBottom: "1px solid var(--color-border)",
                        background: "var(--color-surface-2)",
                    }}>
                        <SortHeader field="created_at">Date</SortHeader>
                        <SortHeader field="client_name">Client</SortHeader>
                        <SortHeader field="total">Amount</SortHeader>
                        <SortHeader field="status">Status</SortHeader>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-3)" }}>Invoice #</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-3)" }}>PDF</span>
                    </div>

                    {/* Table Rows */}
                    {filtered.map((inv) => (
                        <div
                            key={inv.id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "100px 1fr 120px 100px 100px 60px",
                                gap: "12px",
                                padding: "14px 20px",
                                borderBottom: "1px solid var(--color-border)",
                                alignItems: "center",
                                fontSize: "0.875rem",
                                transition: "background 0.1s",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-surface-2)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            <span style={{ color: "var(--color-text-3)", fontVariantNumeric: "tabular-nums" }}>
                                {new Date(inv.issue_date).toLocaleDateString("en-AU", { day: "2-digit", month: "short" })}
                            </span>
                            <span style={{ fontWeight: 500 }}>
                                {inv.client_name || "—"}
                            </span>
                            <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                ${inv.total.toFixed(2)}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); toggleStatus(inv); }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "4px 10px",
                                    borderRadius: "20px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    background: inv.status === "paid"
                                        ? "rgba(34, 197, 94, 0.15)"
                                        : "rgba(250, 204, 21, 0.15)",
                                    color: inv.status === "paid"
                                        ? "rgb(34, 197, 94)"
                                        : "rgb(250, 204, 21)",
                                    textTransform: "capitalize",
                                    transition: "transform 0.1s",
                                }}
                            >
                                {inv.status}
                            </button>
                            <span style={{ color: "var(--color-text-3)", fontVariantNumeric: "tabular-nums", fontSize: "0.8125rem" }}>
                                {inv.invoice_number}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); viewPDF(inv); }}
                                title="View PDF"
                                style={{
                                    background: "none",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "6px",
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    color: "var(--color-text-3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-3)"; e.currentTarget.style.borderColor = "var(--color-border)"; }}
                            >
                                <Download size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
