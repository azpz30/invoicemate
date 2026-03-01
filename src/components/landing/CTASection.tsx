import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section style={{ padding: "120px 0" }}>
            <div className="page-container">
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "32px",
                    }}
                >
                    {/* Glow orb */}
                    <div
                        style={{
                            position: "relative",
                            display: "inline-block",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: "-40px",
                                background:
                                    "radial-gradient(ellipse, rgba(94,106,210,0.12) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }}
                        />
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "clamp(2rem, 5vw, 3rem)",
                                position: "relative",
                            }}
                        >
                            Start invoicing today.
                        </h2>
                    </div>

                    <p
                        style={{
                            fontSize: "1.125rem",
                            maxWidth: "440px",
                            margin: 0,
                        }}
                    >
                        Free to use. No credit card. No accounting degree required.
                    </p>

                    <Link href="/signup" className="btn btn-primary btn-lg">
                        Create free invoice
                        <ArrowRight size={16} />
                    </Link>

                    <p style={{ fontSize: "0.8125rem", margin: 0 }}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: "var(--color-accent)" }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
