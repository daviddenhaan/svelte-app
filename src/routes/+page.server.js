import { error } from '@sveltejs/kit';
import main from "$lib/database/User";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const user = main();

    if (user) {
        return user;
    }

    throw error(400, 'Error');
}