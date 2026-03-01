import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Check if business profile exists
        const { data: existingBusiness } = await supabase
            .from("businesses")
            .select("id")
            .eq("user_id", user.id)
            .single();

        let result;

        if (existingBusiness) {
            // Update
            result = await supabase
                .from("businesses")
                .update({
                    name: body.name,
                    abn: body.abn,
                    address: body.address,
                    phone: body.phone,
                    email: body.email,
                    bank_details: body.bank_details,
                    updated_at: new Date().toISOString(),
                })
                .eq("user_id", user.id)
                .select()
                .single();
        } else {
            // Insert
            result = await supabase
                .from("businesses")
                .insert({
                    user_id: user.id,
                    name: body.name,
                    abn: body.abn,
                    address: body.address,
                    phone: body.phone,
                    email: body.email,
                    bank_details: body.bank_details,
                })
                .select()
                .single();
        }

        if (result.error) {
            console.error("Supabase error:", result.error);
            return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
        }

        return NextResponse.json({ data: result.data });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
