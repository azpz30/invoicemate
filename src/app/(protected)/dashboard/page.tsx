import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";
import { RecentInvoicesList } from "@/components/dashboard/RecentInvoicesList";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Default mock data for Phase 2 UI building
    // We will hook this up to the real 'invoices' table later
    const invoices: import("@/types").Invoice[] = [];
    const stats = {
        totalInvoiced: 0,
        invoicesSent: 0,
        awaitingPayment: 0
    };

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
                    <p style={{ margin: 0, fontSize: "0.875rem" }}>
                        Manage your invoices and business
                    </p>
                </div>
                <Link href="/invoice/new" className="btn btn-primary btn-md">
                    <PlusCircle size={16} />
                    New Invoice
                </Link>
            </div>

            {/* Stats row */}
            <DashboardStats {...stats} />

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

                {invoices.length === 0 ? (
                    <DashboardEmptyState />
                ) : (
                    <RecentInvoicesList invoices={invoices} />
                )}
            </div>
        </div>
    );
}
