<script>
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    import Title from '$lib/components/Title.svelte';
</script>

<Title titleText="Welcome" />
<button class="accent-orange-500 text-orange-700 hover:underline" on:click={deleteAllCookies}>Clear Cookies</button>

<style>

</style>
