"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Business } from "@/types";
import { LogoUpload } from "@/components/profile/LogoUpload";
import { fetchAPI } from "@/lib/api";

// Setup form validation schema
const profileFormSchema = z.object({
    name: z.string().min(2, { message: "Business name must be at least 2 characters." }),
    abn: z.string().optional(),
    address: z.string().min(5, { message: "Please provide a valid business address." }),
    phone: z.string().optional(),
    email: z.string().email({ message: "Please enter a valid email address." }),
    bank_bsb: z.string().optional(),
    bank_account_number: z.string().optional(),
    bank_account_name: z.string().optional(),
    logo_url: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
    initialData: Business | null;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            abn: initialData?.abn || "",
            address: initialData?.address || "",
            phone: initialData?.phone || "",
            email: initialData?.email || "",
            bank_bsb: initialData?.bank_bsb || "",
            bank_account_number: initialData?.bank_account_number || "",
            bank_account_name: initialData?.bank_account_name || "",
            logo_url: initialData?.logo_url || null,
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true);
        try {
            await fetchAPI("business/profile", {
                method: "PUT",
                body: JSON.stringify(data),
            });

            toast.success("Profile updated", {
                description: "Your business details have been saved successfully.",
            });
        } catch (error) {
            console.error(error);
            toast.error("Error", {
                description: "Failed to update profile. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="card" style={{ padding: "32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                {/* Basic Info Section */}
                <div>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Basic Information</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <LogoUpload
                            currentLogoUrl={form.watch("logo_url")}
                            onUploadComplete={(url) => form.setValue("logo_url", url)}
                            onRemoveComplete={() => form.setValue("logo_url", null)}
                        />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label className="label" htmlFor="name">Business Name *</label>
                                <input
                                    id="name"
                                    className="input"
                                    placeholder="Acme Pty Ltd"
                                    {...form.register("name")}
                                />
                                {form.formState.errors.name && (
                                    <span className="text-secondary-foreground text-sm text-red-500">
                                        {form.formState.errors.name.message}
                                    </span>
                                )}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label className="label" htmlFor="abn">ABN</label>
                                <input
                                    id="abn"
                                    className="input"
                                    placeholder="12 345 678 901"
                                    {...form.register("abn")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem" }}>Contact Details</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="label" htmlFor="address">Business Address *</label>
                            <input
                                id="address"
                                className="input"
                                placeholder="123 Example St, Sydney NSW 2000"
                                {...form.register("address")}
                            />
                            {form.formState.errors.address && (
                                <span className="text-secondary-foreground text-sm text-red-500">
                                    {form.formState.errors.address.message}
                                </span>
                            )}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label className="label" htmlFor="email">Email Address *</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="input"
                                    placeholder="hello@acme.com.au"
                                    {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                    <span className="text-secondary-foreground text-sm text-red-500">
                                        {form.formState.errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label className="label" htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="input"
                                    placeholder="0400 000 000"
                                    {...form.register("phone")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "1.125rem" }}>Payment Information</h3>
                    <p style={{ margin: "0 0 16px 0", fontSize: "0.8125rem", color: "var(--color-text-3)" }}>
                        These details will appear at the bottom of your invoices.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", gridColumn: "1 / -1" }}>
                            <label className="label" htmlFor="bank_account_name">Account Name</label>
                            <input
                                id="bank_account_name"
                                className="input"
                                placeholder="Acme Pty Ltd"
                                {...form.register("bank_account_name")}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="label" htmlFor="bank_bsb">BSB</label>
                            <input
                                id="bank_bsb"
                                className="input"
                                placeholder="626-900"
                                {...form.register("bank_bsb")}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className="label" htmlFor="bank_account_number">Account Number</label>
                            <input
                                id="bank_account_number"
                                className="input"
                                placeholder="1234 5678"
                                {...form.register("bank_account_number")}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                    <button
                        type="submit"
                        className="btn btn-primary btn-md"
                        style={{ minWidth: "140px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 600px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </form>
    );
}
