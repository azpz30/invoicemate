import { Invoice } from "@/types";
import { format } from "date-fns";
import Link from "next/link";

interface RecentInvoicesListProps {
    invoices: Invoice[];
}

export function RecentInvoicesList({ invoices }: RecentInvoicesListProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
        }).format(amount);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {invoices.map((invoice) => (
                <Link
                    key={invoice.id}
                    href={`/invoice/${invoice.id}`}
                    className="card card-hover"
                    style={{
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                background: "var(--color-surface-2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                                color: "var(--color-text-2)",
                            }}
                        >
                            {invoice.status === "paid" ? "PAID" : "DRAFT"}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                                {invoice.client?.name || "Unknown Client"}
                            </div>
                            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-3)" }}>
                                {invoice.invoice_number} • {format(new Date(invoice.issue_date), "MMM d, yyyy")}
                            </div>
                        </div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                        {formatCurrency(invoice.total)}
                    </div>
                </Link>
            ))}
        </div>
    );
}
