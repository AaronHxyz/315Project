import { setUser } from "./App";

const API_BASE_URL = "http://localhost:3001/api";

export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }
    return true;
}
export async function signup(username, email, password) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }
    return true;
}

export async function getMe(){
    const response = await fetch(`${API_BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching user data:", errorData.message || "Unknown error");
        return;
    }
    return await response.json();
}
