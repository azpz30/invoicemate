"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface LogoUploadProps {
    currentLogoUrl?: string | null;
    onUploadComplete: (url: string) => void;
    onRemoveComplete: () => void;
}

export function LogoUpload({ currentLogoUrl, onUploadComplete, onRemoveComplete }: LogoUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setIsUploading(true);
            const file = event.target.files?.[0];

            if (!file) return;

            // Validate file type
            if (!file.type.includes("image/")) {
                toast.error("Invalid file type", { description: "Please upload an image file." });
                return;
            }

            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File excessively large", { description: "Logo must be under 2MB." });
                return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Format filename
            const fileExt = file.name.split(".").pop();
            const fileName = `${user.id}/${uuidv4()}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("logos")
                .upload(fileName, file, {
                    upsert: true,
                    cacheControl: '3600'
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from("logos")
                .getPublicUrl(fileName);

            onUploadComplete(data.publicUrl);
            toast.success("Logo uploaded!");

        } catch (error) {
            console.error(error);
            toast.error("Upload failed", { description: "There was an error uploading your logo." });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label className="label">Business Logo</label>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "12px",
                        border: "1px dashed var(--color-border)",
                        background: "var(--color-surface-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin text-muted-foreground" size={24} />
                    ) : currentLogoUrl ? (
                        <Image
                            src={currentLogoUrl}
                            alt="Business Logo"
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="80px"
                        />
                    ) : (
                        <Upload size={24} className="text-muted-foreground" />
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <label
                            className="btn btn-secondary btn-sm"
                            style={{ cursor: isUploading ? "not-allowed" : "pointer" }}
                        >
                            Upload logo
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={handleUpload}
                                disabled={isUploading}
                                style={{ display: "none" }}
                            />
                        </label>

                        {currentLogoUrl && (
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm"
                                onClick={onRemoveComplete}
                                disabled={isUploading}
                                style={{ color: "var(--color-text-3)" }}
                            >
                                <X size={16} />
                                Remove
                            </button>
                        )}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-3)", lineHeight: 1.4 }}>
                        Recommended size: 400x400px.<br />Max 2MB. JPG, PNG, or SVG.
                    </span>
                </div>
            </div>
        </div>
    );
}

