import { ProfileForm } from "@/components/profile/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user's business profile from Supabase
    const { data: businessData } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .single();

    // If no row exists yet, this will be null.
    // Make sure we pass null, not undefined, to match the Business | null type expect.
    const initialData = businessData || null;

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
