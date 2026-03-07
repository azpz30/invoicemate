export interface Business {
    id: string;
    user_id: string;
    name: string;
    abn?: string;
    address: string;
    phone?: string;
    email: string;
    bank_bsb?: string;
    bank_account_number?: string;
    bank_account_name?: string;
    logo_url?: string;
    created_at: string;
}

export interface Client {
    id: string;
    user_id: string;
    name: string;
    address?: string;
    email?: string;
    created_at: string;
}

export interface InvoiceItem {
    id?: string;
    invoice_id?: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export interface Invoice {
    id: string;
    user_id: string;
    business_id: string;
    client_id: string;
    client?: Client;
    client_name?: string;
    invoice_number: string;
    issue_date: string;
    due_date: string;
    subtotal: number;
    gst: number;
    total: number;
    status: "draft" | "paid";
    notes?: string;
    custom_message?: string;
    include_gst: boolean;
    items?: InvoiceItem[];
    created_at: string;
}

export interface InvoiceForm {
    business_id: string;
    client_id?: string;
    new_client?: {
        name: string;
        address?: string;
        email?: string;
    };
    issue_date: string;
    due_date: string;
    notes: string;
    custom_message: string;
    include_gst: boolean;
    items: Omit<InvoiceItem, "id" | "invoice_id">[];
}
