"use client";

const steps = [
    {
        number: "01",
        title: "Add your business details",
        description:
            "Enter your business name, ABN, address, and bank details once. InvoiceMate auto-fills them on every invoice.",
    },
    {
        number: "02",
        title: "Create your invoice",
        description:
            "Add line items, set dates, and optionally include GST. Everything is calculated automatically.",
    },
    {
        number: "03",
        title: "Download PDF",
        description:
            "Get a professional, GST-compliant PDF instantly. Send it directly to your client.",
    },
];

export default function HowItWorksSection() {
    return (
        <section
            style={{
                padding: "96px 0",
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
            }}
        >
            <div className="page-container">
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "64px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <div className="section-label">How it works</div>
                    <h2 style={{ margin: 0 }}>Up and running in minutes</h2>
                    <p style={{ maxWidth: "400px", margin: "0 auto" }}>
                        Three steps to your first professional invoice.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "2px",
                        position: "relative",
                    }}
                    className="steps-grid"
                >
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                padding: "32px",
                                position: "relative",
                                background: i === 1 ? "var(--color-surface-2)" : "transparent",
                                borderRadius: i === 1 ? "var(--radius-lg)" : "0",
                                border: i === 1 ? "1px solid var(--color-border)" : "none",
                            }}
                        >
                            {/* Step number */}
                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "12px",
                                    background:
                                        i === 1
                                            ? "var(--color-accent)"
                                            : "var(--color-surface-2)",
                                    border: `1px solid ${i === 1 ? "var(--color-accent)" : "var(--color-border)"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "0.875rem",
                                    color: i === 1 ? "#fff" : "var(--color-text-3)",
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {step.number}
                            </div>

                            <div>
                                <h3
                                    style={{
                                        margin: "0 0 10px 0",
                                        fontSize: "1.0625rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: "1.65" }}>
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector line (between cards on desktop) */}
                            {i < steps.length - 1 && (
                                <div
                                    className="step-connector"
                                    style={{
                                        position: "absolute",
                                        top: "50px",
                                        right: "-20px",
                                        width: "40px",
                                        height: "1px",
                                        background:
                                            "linear-gradient(to right, var(--color-border), transparent)",
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
        </section>
    );
}
