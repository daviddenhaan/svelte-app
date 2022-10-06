<script>
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<Navbar />

<slot></slot>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>