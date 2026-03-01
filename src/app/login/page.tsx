"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/dashboard` },
        });
    };

    const handleAppleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "apple",
            options: { redirectTo: `${window.location.origin}/dashboard` },
        });
    };

    return (
        <div
            className="grid-bg"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
        >
            <div
                className="card"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                }}
            >
                {/* Logo + heading */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", textAlign: "center" }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                background: "var(--color-accent)",
                                borderRadius: "9px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FileText size={18} color="#fff" />
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "1rem", letterSpacing: "-0.01em" }}>
                            InvoiceMate AU
                        </span>
                    </Link>
                    <div>
                        <h1 style={{ margin: "0 0 6px 0", fontSize: "1.375rem" }}>Welcome back</h1>
                        <p style={{ margin: 0, fontSize: "0.875rem" }}>Sign in to your account</p>
                    </div>
                </div>

                {/* OAuth buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn btn-secondary btn-md"
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.55 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        onClick={handleAppleLogin}
                        className="btn btn-secondary btn-md"
                        style={{ width: "100%", justifyContent: "center" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor">
                            <path d="M788 872c-45 75-94 150-168 151-74 1-98-44-183-44-85 0-112 44-183 45-73 1-126-74-171-149C0 663 0 404 111 261c74-101 189-160 295-160 98 0 160 47 241 47 80 0 129-47 244-47 94 0 203 50 277 138-244 134-205 484 20 633zm-239-778C584 41 617 0 650 0c0 57-48 143-105 214-58 73-112 99-127 97-5-64 40-143 131-217z" />
                        </svg>
                        Continue with Apple
                    </button>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="divider" style={{ flex: 1 }} />
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-3)" }}>or</span>
                    <div className="divider" style={{ flex: 1 }} />
                </div>

                {/* Email/password form */}
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {error && (
                        <div
                            style={{
                                background: "rgba(224,84,84,0.08)",
                                border: "1px solid rgba(224,84,84,0.2)",
                                borderRadius: "var(--radius-md)",
                                padding: "12px 16px",
                                fontSize: "0.8125rem",
                                color: "var(--color-error)",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="label">Email address</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input"
                        />
                    </div>

                    <div className="form-group">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <label htmlFor="password" className="label">Password</label>
                            <Link href="/forgot-password" style={{ fontSize: "0.75rem", color: "var(--color-text-3)" }}>
                                Forgot password?
                            </Link>
                        </div>
                        <div style={{ position: "relative" }}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="input"
                                style={{ paddingRight: "44px" }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--color-text-3)",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-md"
                        style={{ width: "100%", justifyContent: "center", marginTop: "4px" }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Signing in…
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: "0.8125rem", margin: 0 }}>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    );
}
