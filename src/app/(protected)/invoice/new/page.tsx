import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { InvoiceForm } from "@/components/invoice/InvoiceForm";
import { Business } from "@/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewInvoicePage() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    // Fetch businesses from Go backend
    const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    let businesses: Business[] = [];
    try {
        const res = await fetch(`${backendURL}/api/business/profile`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
        });
        if (res.ok) {
            const json = await res.json();
            if (json.data) {
                // Backend returns a single profile, wrap it in an array
                businesses = [json.data];
            }
        }
    } catch (error) {
        console.error("Failed to fetch businesses", error);
    }

    if (businesses.length === 0) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div>
                    <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>New Invoice</h1>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                        You need to set up a business profile first.
                    </p>
                </div>
                <div className="card" style={{
                    padding: "48px 32px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                }}>
                    <p style={{ margin: 0, fontSize: "0.9375rem" }}>
                        Please complete your business profile before creating invoices.
                    </p>
                    <Link href="/profile" className="btn btn-primary btn-md">
                        Set Up Business Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Link
                    href="/dashboard"
                    style={{
                        color: "var(--color-text-3)",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 style={{ margin: "0 0 2px 0", fontSize: "1.5rem" }}>New Invoice</h1>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                        Create a GST-compliant invoice for your client.
                    </p>
                </div>
            </div>

            <InvoiceForm businesses={businesses} />
        </div>
    );
}
