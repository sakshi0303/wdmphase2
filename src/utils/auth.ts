// auth.ts

import { UserData } from "../types/types";

// Define user roles
export const USER_ROLES: string[] = ['student', 'instructor', 'admin', 'coordinator', 'qa'];

// Function to check if a user is authorized for a page
export function isAuthorized(userRole: string, allowedRoles: string[]): boolean {
    return allowedRoles.includes(userRole);
}

export function getCurrentUserProfile(): UserData {
    const storedUser = sessionStorage.getItem('identity') ?? 
        JSON.stringify({id: -1, name: 'test', role: 'test', email: 'test@gmail.com'});
    const user = JSON.parse(storedUser);

    // Create a user profile object
    return {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
    };
}

// Function to log the user out
export function logout(): void {
    // Remove the 'identity' key from session storage
    sessionStorage.removeItem('identity');

    // Redirect the user to the login page
    window.location.href = 'login.html';
}

export function checkAuthorized(): void {
    const storedUser = sessionStorage.getItem('identity') ?? 'unknown';

    if (storedUser === 'unknown') {
        window.location.href = 'error.html';
    }

    const user = JSON.parse(storedUser);
    const userRole = user.role;

    if (!isAuthorized(userRole, USER_ROLES)) {
        console.log('auth method called!');
        window.location.href = 'error.html';
    }
}

export function userProfile(name: string): void {
    // Get references to the dropdown elements
    const userInitial = document.getElementById('userInitial') as HTMLDivElement;

    // Set the circular button's text to the user's name's starting letter
    if (userInitial) {
        userInitial.textContent = name;
    }
}
