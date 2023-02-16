<script>
    import '../../app.postcss';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { Toaster } from 'svelte-french-toast';

    export let data;

    $: if(data?.isLogged) browser && goto('/');
</script>

<div class="view">
    <slot/>
    <Toaster/>
</div>

<style>
    .view {
        height: 100vh;
        display:grid;
        place-content: center;
    }
</style>