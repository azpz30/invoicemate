"use client";

interface DashboardStatsProps {
    totalInvoiced: number;
    invoicesSent: number;
    awaitingPayment: number;
}

export function DashboardStats({ totalInvoiced, invoicesSent, awaitingPayment }: DashboardStatsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
        }).format(amount);
    };

    const stats = [
        { label: "Total invoiced", value: formatCurrency(totalInvoiced) },
        { label: "Invoices sent", value: invoicesSent.toString() },
        { label: "Awaiting payment", value: formatCurrency(awaitingPayment) },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
            }}
            className="stats-grid"
        >
            {stats.map((stat) => (
                <div key={stat.label} className="card" style={{ padding: "20px 24px" }}>
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
