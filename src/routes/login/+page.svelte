<script>
    import { setCookie, getToken } from "$lib/util/Cookie";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let emailInput;
    let passwordInput;

    async function login(email, password) {
        emailInput.value = "";
        passwordInput.value = "";

        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!res.ok) return;
        const data = await res.json();

        if (data.token) {
            setCookie("token", data.token, 1);
            goto("/");
        }
    }

    onMount(() => {
        const token = getToken();
        if (token) {
            goto("/");
        }
    });

    import Title from "$lib/components/Title.svelte";
</script>

<div class="grid h-screen place-items-center pb-32">
    <div>
        <Title titleText="Log in"></Title>
        <div class="text-center border-2 px-2 rounded-md hover:border-gray-300">
            <input class="mt-5 border-2 focus:border-orange-500 outline-none hover:border-gray-400 rounded mx-2 my-1 text-center p-0.5" type="text" bind:this={emailInput} placeholder="email" /><br/>
            <input class="border-2 focus:border-orange-500 outline-none hover:border-gray-400 rounded mx-2 my-1 text-center p-0.5" type="text" bind:this={passwordInput} placeholder="password" /><br/>
            <button class="my-3 focus:outline-none px-4 py-1 rounded-2xl hover:bg-orange-500 hover:text-white" on:click={() => {login(emailInput.value, passwordInput.value)}}>Log in</button><br/>
            <p class="mb-4 mt-1">Don't have an account? <a class="text-orange-500 hover:underline" href="/register">Register</a></p>
        </div>
    </div>
</div>

<style>

</style>