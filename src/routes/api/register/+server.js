import { json } from '@sveltejs/kit';
import { genSalt, hash, registerUser } from "$lib/database/User";
import { updateToken } from "$lib/database/Auth";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { username, email, password } = await request.json();

    if (username && email && password) {
        const hashed_password = await hash(password, await genSalt())
        const user = await registerUser(username, email.toLowerCase(), hashed_password);
        const success = !!user;

        if (!success) {
            return json(null);
        }

        return json({ token: updateToken(user.uuid) });
    }

    return json(false);
}