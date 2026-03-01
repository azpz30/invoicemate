import AppShell from "@/components/shared/AppShell";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppShell>{children}</AppShell>;
}
