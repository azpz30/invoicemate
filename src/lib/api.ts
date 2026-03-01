import { createClient } from "./supabase/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

/**
 * fetchAPI is a wrapper around the native fetch API that automatically
 * injects the current user's Supabase JWT access token for authenticated
 * requests to the custom Go backend.
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    // Initialize the Supabase client
    const supabase = createClient();

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session.access_token}`);
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, config);

    // If the response is not ok, try to extract the error message from the API
    if (!response.ok) {
        let errorMessage = "An error occurred while fetching the data.";
        try {
            const errorData = await response.json();
            if (errorData.message) {
                errorMessage = errorData.message;
            } else if (errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (e) {
            // If we can't parse JSON, fallback to generic
            console.error("Failed to parse error response", e);
        }
        throw new Error(errorMessage);
    }

    // Try parsing the successful response as JSON
    try {
        return await response.json();
    } catch {
        return null;
    }
}
