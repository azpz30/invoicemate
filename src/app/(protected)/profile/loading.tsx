import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>Business Profile</h1>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                    Loading your business settings...
                </p>
            </div>

            <div className="card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Basic Info */}
                    <div>
                        <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Basic Information</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                                <Skeleton className="h-[80px] w-[80px] rounded-xl" />
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <Skeleton className="h-[32px] w-[140px]" />
                                    <Skeleton className="h-[16px] w-[200px]" />
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <Skeleton className="h-[16px] w-[120px]" />
                                    <Skeleton className="h-[40px] w-full rounded-md" />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <Skeleton className="h-[16px] w-[80px]" />
                                    <Skeleton className="h-[40px] w-full rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Contact Details</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <Skeleton className="h-[16px] w-[140px]" />
                                <Skeleton className="h-[40px] w-full rounded-md" />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <Skeleton className="h-[16px] w-[120px]" />
                                    <Skeleton className="h-[40px] w-full rounded-md" />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <Skeleton className="h-[16px] w-[100px]" />
                                    <Skeleton className="h-[40px] w-full rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <Skeleton className="h-[40px] w-[140px] rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
