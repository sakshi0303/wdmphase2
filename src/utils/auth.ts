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
        email: user.email,
        password: user.password,
        uuid: user.uuid
    };
}

export function checkAuthorized(allowed_user_roles: string[]): boolean {
    const storedUser = sessionStorage.getItem('identity') ?? 'unknown';

    if (storedUser === 'unknown') {
        return false
    }

    const user = JSON.parse(storedUser);
    const userRole = user.role;

    if (!isAuthorized(userRole, allowed_user_roles)) {
        console.log('auth method called!');
        return false
    }
    return true
}

export function userProfile(name: string): void {
    // Get references to the dropdown elements
    const userInitial = document.getElementById('userInitial') as HTMLDivElement;

    // Set the circular button's text to the user's name's starting letter
    if (userInitial) {
        userInitial.textContent = name;
    }
}
