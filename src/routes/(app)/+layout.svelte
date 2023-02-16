<script>
    import "../../app.postcss";
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { Navbar } from '$lib/components';
    import { Toaster } from 'svelte-french-toast';

    export let data;
    $: if(!data?.isLogged) browser && goto(`/login`);    
</script>

<div class="app">
    <Navbar/>
    <slot/>
    <Toaster/>
</div>

<style>
    .app {
        height: 100vh;
    }
</style>