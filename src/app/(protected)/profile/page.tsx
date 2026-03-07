import { ProfileForm } from "@/components/profile/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createClient();

    // getUser() re-validates with Supabase server and refreshes the session if needed.
    // This is the recommended way to protect server components, and ensures the
    // access_token we get from getSession() below is fresh.
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // After getUser() refreshes the session, getSession() returns a valid, fresh token
    const { data: { session } } = await supabase.auth.getSession();

    // Fetch user's business profile from the Go Backend using the session token
    let initialData: import("@/types").Business | null = null;
    if (session?.access_token) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/business/profile`, {
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                },
                cache: 'no-store'
            });

            if (response.ok) {
                const result = await response.json();
                if (result.data) {
                    initialData = result.data;
                }
            } else {
                console.error("Failed to fetch profile from API", await response.text());
            }
        } catch (error) {
            console.error("Error fetching profile from API", error);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", fontSize: "1.5rem" }}>Business Profile</h1>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-3)" }}>
                    Manage your business information and invoice details.
                </p>
            </div>

            <ProfileForm initialData={initialData} />
        </div>
    );
}
