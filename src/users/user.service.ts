import { User } from '../server/server';

const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;

function getUserUrl(userId: number) {
    return `${USERS_URL}/${userId}`;
}

const getFetchJSON = (response: Response) => {
    return response.json();
}

// ============================================================

export function getUsers(): Promise<User[]> {
    return fetch(USERS_URL)
        .then(getFetchJSON);
}

export function getUser(userId: number): Promise<User> {
    return fetch(`${getUserUrl(userId)}`)
        .then(getFetchJSON);
}

export function addUser(user: Omit<User, 'id'>): Promise<User> {
    return fetch(USERS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
        .then(getFetchJSON);
}

export function deleteUser(userId: number): Promise<User> {
    return fetch(`${getUserUrl(userId)}`, {
        method: 'DELETE',
    })
        .then(getFetchJSON);
}

export async function updateUser(userId: number, userUpdates: Partial<User>): Promise<User> {
    const existingUser = await getUser(userId);

    const updatedUser = { ...existingUser, ...userUpdates };

    return fetch(getUserUrl(userId), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser),
    })
        .then(getFetchJSON);
}
