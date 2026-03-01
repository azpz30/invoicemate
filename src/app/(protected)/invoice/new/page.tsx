import Link from "next/link";
import { FileText } from "lucide-react";

// Phase 3 will build the full invoice builder
export default function NewInvoicePage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>New Invoice</h1>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>
                    Create a GST-compliant invoice for your client.
                </p>
            </div>

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
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>
                        Invoice builder — coming in Phase 3
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.875rem" }}>
                        Add line items, auto-calculate GST, and download a professional PDF.
                    </p>
                </div>
                <Link href="/dashboard" className="btn btn-secondary btn-md">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
