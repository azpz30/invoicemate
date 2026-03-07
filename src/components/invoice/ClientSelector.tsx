"use client";

import { useState, useEffect } from "react";
import { Client } from "@/types";
import { fetchAPI } from "@/lib/api";
import { Plus, User } from "lucide-react";

interface ClientSelectorProps {
    selectedClientId: string | undefined;
    onClientSelect: (clientId: string) => void;
    onNewClient: (client: { name: string; address?: string; email?: string }) => void;
    newClientData?: { name: string; address?: string; email?: string };
}

export function ClientSelector({ selectedClientId, onClientSelect, onNewClient, newClientData }: ClientSelectorProps) {
    const [clients, setClients] = useState<Client[]>([]);
    const [showNewForm, setShowNewForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState(newClientData?.name || "");
    const [newAddress, setNewAddress] = useState(newClientData?.address || "");
    const [newEmail, setNewEmail] = useState(newClientData?.email || "");

    useEffect(() => {
        async function loadClients() {
            try {
                const json = await fetchAPI("clients");
                setClients(json?.data || []);
            } catch (err) {
                console.error("Failed to load clients", err);
            } finally {
                setLoading(false);
            }
        }
        loadClients();
    }, []);

    function handleNewClientChange(name: string, address: string, email: string) {
        setNewName(name);
        setNewAddress(address);
        setNewEmail(email);
        onNewClient({
            name,
            address: address || undefined,
            email: email || undefined,
        });
    }

    if (loading) {
        return (
            <div className="card" style={{ padding: "16px" }}>
                <p style={{ margin: 0, color: "var(--color-text-3)", fontSize: "0.875rem" }}>Loading clients...</p>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "1.125rem" }}>Client</h3>
                <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ fontSize: "0.8125rem", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px" }}
                    onClick={() => {
                        setShowNewForm(!showNewForm);
                        if (!showNewForm) {
                            onClientSelect("");
                        } else {
                            onNewClient({ name: "" });
                        }
                    }}
                >
                    {showNewForm ? (
                        <>
                            <User size={14} />
                            Select Existing
                        </>
                    ) : (
                        <>
                            <Plus size={14} />
                            New Client
                        </>
                    )}
                </button>
            </div>

            {showNewForm ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "1 / -1" }}>
                        <label className="label" htmlFor="new_client_name">Client Name *</label>
                        <input
                            id="new_client_name"
                            className="input"
                            placeholder="John Smith Plumbing"
                            value={newName}
                            onChange={(e) => handleNewClientChange(e.target.value, newAddress, newEmail)}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="new_client_email">Email</label>
                        <input
                            id="new_client_email"
                            type="email"
                            className="input"
                            placeholder="client@example.com"
                            value={newEmail}
                            onChange={(e) => handleNewClientChange(newName, newAddress, e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label className="label" htmlFor="new_client_address">Address</label>
                        <input
                            id="new_client_address"
                            className="input"
                            placeholder="123 Main St, Sydney NSW"
                            value={newAddress}
                            onChange={(e) => handleNewClientChange(newName, e.target.value, newEmail)}
                        />
                    </div>
                </div>
            ) : (
                <select
                    className="input"
                    value={selectedClientId || ""}
                    onChange={(e) => onClientSelect(e.target.value)}
                    style={{ cursor: "pointer" }}
                >
                    <option value="">Select a client...</option>
                    {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}{c.email ? ` (${c.email})` : ""}
                        </option>
                    ))}
                    {clients.length === 0 && (
                        <option disabled>No clients yet — create one above</option>
                    )}
                </select>
            )}
        </div>
    );
}
