import { json } from "@sveltejs/kit";
import { jwtVerify } from "$lib/database/Auth";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { token } = await request.json();
    const dbToken = await jwtVerify(token);
    return json({ token: dbToken ? dbToken : null });
}