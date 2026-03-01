import { Building2 } from "lucide-react";

// Phase 2 will build the full business profile form
export default function ProfilePage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>Business Profile</h1>
                <p style={{ margin: 0, fontSize: "0.875rem" }}>
                    Your business info is used to populate invoices automatically.
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
                    <Building2 size={22} />
                </div>
                <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>
                        Business profile — coming in Phase 2
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.875rem" }}>
                        You&apos;ll be able to enter your ABN, address, bank details, and logo here.
                    </p>
                </div>
            </div>
        </div>
    );
}
