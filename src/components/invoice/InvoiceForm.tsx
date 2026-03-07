"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchAPI } from "@/lib/api";
import { Business, InvoiceForm as InvoiceFormType } from "@/types";
import { ClientSelector } from "./ClientSelector";
import { LineItemsTable } from "./LineItemsTable";

interface InvoiceFormProps {
    businesses: Business[];
}

function getToday(): string {
    return new Date().toISOString().split("T")[0];
}

function getDueDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
}

export function InvoiceForm({ businesses }: InvoiceFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState<InvoiceFormType>({
        business_id: businesses.length === 1 ? businesses[0].id : "",
        client_id: undefined,
        new_client: undefined,
        issue_date: getToday(),
        due_date: getDueDate(),
        notes: "",
        custom_message: "",
        include_gst: true,
        items: [{ description: "", quantity: 1, unit_price: 0, total: 0 }],
    });

    // Calculations
    const subtotal = form.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const roundedSubtotal = Math.round(subtotal * 100) / 100;
    const gst = form.include_gst ? Math.round(roundedSubtotal * 0.10 * 100) / 100 : 0;
    const total = Math.round((roundedSubtotal + gst) * 100) / 100;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!form.business_id) {
            toast.error("Please select a business.");
            setIsLoading(false);
            return;
        }
        if (!form.client_id && (!form.new_client || !form.new_client.name)) {
            toast.error("Please select or create a client.");
            setIsLoading(false);
            return;
        }
        if (form.items.length === 0 || form.items.every(i => !i.description)) {
            toast.error("Please add at least one line item.");
            setIsLoading(false);
            return;
        }

        try {
            const payload = {
                ...form,
                // Strip empty new_client if we have a client_id
                new_client: form.client_id ? undefined : form.new_client,
                client_id: form.client_id || undefined,
            };

            await fetchAPI("invoices", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            toast.success("Invoice created!", {
                description: "Your invoice has been saved as a draft.",
            });
            router.push("/invoices");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create invoice", {
                description: error instanceof Error ? error.message : "Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Business Selector */}
            <div className="card" style={{ padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label" htmlFor="business_id">Business *</label>
                    {businesses.length === 1 ? (
                        <div className="input" style={{
                            background: "var(--color-surface-2)",
                            display: "flex",
                            alignItems: "center",
                        }}>
                            {businesses[0].name}
                        </div>
                    ) : (
                        <select
                            id="business_id"
                            className="input"
                            value={form.business_id}
                            onChange={(e) => setForm(f => ({ ...f, business_id: e.target.value }))}
                            style={{ cursor: "pointer" }}
                        >
                            <option value="">Select a business...</option>
                            {businesses.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* Client Section */}
            <div className="card" style={{ padding: "24px" }}>
                <ClientSelector
                    selectedClientId={form.client_id}
                    onClientSelect={(id) => setForm(f => ({ ...f, client_id: id, new_client: undefined }))}
                    onNewClient={(nc) => setForm(f => ({ ...f, new_client: nc, client_id: undefined }))}
                    newClientData={form.new_client}
                />
            </div>

            {/* Invoice Details */}
            <div className="card" style={{ padding: "24px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Invoice Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="issue_date">Issue Date *</label>
                        <input
                            id="issue_date"
                            type="date"
                            className="input"
                            value={form.issue_date}
                            onChange={(e) => setForm(f => ({ ...f, issue_date: e.target.value }))}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="due_date">Due Date *</label>
                        <input
                            id="due_date"
                            type="date"
                            className="input"
                            value={form.due_date}
                            onChange={(e) => setForm(f => ({ ...f, due_date: e.target.value }))}
                        />
                    </div>
                </div>
            </div>

            {/* Line Items */}
            <div className="card" style={{ padding: "24px" }}>
                <LineItemsTable
                    items={form.items}
                    onChange={(items) => setForm(f => ({ ...f, items }))}
                />

                {/* Totals */}
                <div style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "8px",
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        gap: "8px 24px",
                        fontSize: "0.9375rem",
                        fontVariantNumeric: "tabular-nums",
                    }}>
                        <span style={{ color: "var(--color-text-3)", textAlign: "right" }}>Subtotal:</span>
                        <span style={{ textAlign: "right", fontWeight: 500 }}>${roundedSubtotal.toFixed(2)}</span>

                        <label style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            color: "var(--color-text-3)",
                            justifyContent: "flex-end",
                        }}>
                            <input
                                type="checkbox"
                                checked={form.include_gst}
                                onChange={(e) => setForm(f => ({ ...f, include_gst: e.target.checked }))}
                                style={{ cursor: "pointer" }}
                            />
                            GST (10%):
                        </label>
                        <span style={{ textAlign: "right", fontWeight: 500 }}>${gst.toFixed(2)}</span>

                        <div style={{
                            gridColumn: "1 / -1",
                            borderTop: "2px solid var(--color-border)",
                            margin: "4px 0",
                        }} />

                        <span style={{ textAlign: "right", fontSize: "1.125rem", fontWeight: 700 }}>Total:</span>
                        <span style={{ textAlign: "right", fontSize: "1.125rem", fontWeight: 700 }}>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Notes & Custom Message */}
            <div className="card" style={{ padding: "24px" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Additional Information</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            className="input"
                            style={{ resize: "vertical", minHeight: "60px" }}
                            placeholder="Payment terms, thank you message, etc."
                            value={form.notes}
                            onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                        />
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-3)" }}>
                            Shown at the bottom of the invoice.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="custom_message">Custom Message</label>
                        <textarea
                            id="custom_message"
                            className="input"
                            style={{ resize: "vertical", minHeight: "60px" }}
                            placeholder="e.g. Emergency callout rate applies after 5 PM. Scope: Full kitchen re-pipe."
                            value={form.custom_message}
                            onChange={(e) => setForm(f => ({ ...f, custom_message: e.target.value }))}
                        />
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-3)" }}>
                            Explain charges, scope of work, or any additional context for your client.
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                    type="button"
                    className="btn btn-secondary btn-md"
                    onClick={() => router.push("/dashboard")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-md"
                    style={{ minWidth: "160px" }}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Save as Draft"}
                </button>
            </div>

            <style jsx>{`
                @media (max-width: 600px) {
                    div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </form>
    );
}
