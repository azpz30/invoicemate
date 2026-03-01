import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
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
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                        Loading your dashboard...
                    </p>
                </div>
                <Skeleton className="h-[40px] w-[130px] rounded-lg" />
            </div>

            {/* Stats row */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                }}
                className="stats-grid"
            >
                {[1, 2, 3].map((i) => (
                    <div key={i} className="card" style={{ padding: "20px 24px" }}>
                        <Skeleton className="h-[12px] w-[100px] mb-[12px]" />
                        <Skeleton className="h-[28px] w-[140px]" />
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

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                padding: "16px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <Skeleton className="h-[40px] w-[40px] rounded-lg" />
                                <div>
                                    <Skeleton className="h-[18px] w-[140px] mb-[8px]" />
                                    <Skeleton className="h-[14px] w-[180px]" />
                                </div>
                            </div>
                            <Skeleton className="h-[18px] w-[80px]" />
                        </div>
                    ))}
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
