import { json } from '@sveltejs/kit';
import { login } from "$lib/database/Auth";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { email, password } = await request.json();
    return json({ token: await login(email.toLowerCase(), password) });
}