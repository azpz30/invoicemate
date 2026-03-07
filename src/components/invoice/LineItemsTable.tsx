"use client";

import { Trash2, Plus } from "lucide-react";

interface LineItem {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface LineItemsTableProps {
    items: LineItem[];
    onChange: (items: LineItem[]) => void;
}

export function LineItemsTable({ items, onChange }: LineItemsTableProps) {
    function updateItem(index: number, field: keyof LineItem, value: string) {
        const updated = [...items];
        if (field === "description") {
            updated[index].description = value;
        } else {
            const num = parseFloat(value) || 0;
            if (field === "quantity") updated[index].quantity = num;
            if (field === "unit_price") updated[index].unit_price = num;
        }
        // Recalculate row total
        updated[index].total = Math.round(updated[index].quantity * updated[index].unit_price * 100) / 100;
        onChange(updated);
    }

    function addItem() {
        onChange([...items, { description: "", quantity: 1, unit_price: 0, total: 0 }]);
    }

    function removeItem(index: number) {
        if (items.length <= 1) return;
        const updated = items.filter((_, i) => i !== index);
        onChange(updated);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ margin: 0, fontSize: "1.125rem" }}>Line Items</h3>

            {/* Header */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 90px 120px 100px 40px",
                    gap: "8px",
                    padding: "0 0 8px 0",
                    borderBottom: "1px solid var(--color-border)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--color-text-3)",
                }}
            >
                <span>Description</span>
                <span style={{ textAlign: "right" }}>Qty</span>
                <span style={{ textAlign: "right" }}>Unit Price</span>
                <span style={{ textAlign: "right" }}>Total</span>
                <span></span>
            </div>

            {/* Rows */}
            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 90px 120px 100px 40px",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <input
                        className="input"
                        placeholder="e.g. Plumbing repair work"
                        value={item.description}
                        onChange={(e) => updateItem(index, "description", e.target.value)}
                    />
                    <input
                        className="input"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="1"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        style={{ textAlign: "right" }}
                    />
                    <div style={{ position: "relative" }}>
                        <span style={{
                            position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)",
                            color: "var(--color-text-3)", fontSize: "0.875rem", pointerEvents: "none"
                        }}>$</span>
                        <input
                            className="input"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={item.unit_price || ""}
                            onChange={(e) => updateItem(index, "unit_price", e.target.value)}
                            style={{ textAlign: "right", paddingLeft: "24px" }}
                        />
                    </div>
                    <div style={{
                        textAlign: "right",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        fontVariantNumeric: "tabular-nums",
                        padding: "0 4px",
                    }}>
                        ${item.total.toFixed(2)}
                    </div>
                    <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length <= 1}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: items.length <= 1 ? "not-allowed" : "pointer",
                            color: items.length <= 1 ? "var(--color-text-3)" : "var(--color-danger, #ef4444)",
                            padding: "4px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: items.length <= 1 ? 0.3 : 0.7,
                            transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => { if (items.length > 1) e.currentTarget.style.opacity = "1"; }}
                        onMouseLeave={(e) => { if (items.length > 1) e.currentTarget.style.opacity = "0.7"; }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            {/* Add button */}
            <button
                type="button"
                onClick={addItem}
                className="btn btn-secondary"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-start",
                    fontSize: "0.8125rem",
                    padding: "8px 14px",
                }}
            >
                <Plus size={14} />
                Add Line Item
            </button>

            {/* Responsive styles */}
            <style jsx>{`
                @media (max-width: 640px) {
                    div[style*="grid-template-columns: 1fr 90px"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
