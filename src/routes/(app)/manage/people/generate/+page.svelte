<script>
    import PrintPdf, { Page } from 'svelte-printpdf';
    import Barcode from 'svelte-barcode'
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { onDestroy , onMount } from 'svelte';

    const selection = browser && localStorage.getItem('gen');
    let people = [];
    let targets = []

    if(!selection) browser && goto('/manage/people');

    const printAll = () => targets = targets.map(() => true)

    const returnPage = () => {
        browser && localStorage.removeItem('gen');
        browser && goto('/manage/people')
    }

    onMount(() => {
        const peopleStr = JSON.parse(selection);
        people = peopleStr.map(str => JSON.parse(str));
        targets = people.map(() => false);
    })
    onDestroy(() => browser && localStorage.removeItem('gen'));
</script>

<div class="m-8 flex justify-around">
    <button class="btn btn-success text-white" on:click={printAll}>Imprimir todo</button>
    <button class="btn btn-success text-white" on:click={returnPage}>Regresar</button>
</div>

{#if people?.length}
{#each people as person , i }
<div class="mt-3">
    <button class="btn btn-ghost text-success" on:click={() => targets[i] = true}>Imprimir</button>
</div>
<PrintPdf bind:print={targets[i]}>
    <Page>
        
        <div class="view">
            <div class="container">
                <h2 class="text-3xl text-black font-bold text-center">Código de usuario</h2>
                <div class="text">
                    <div class="box">
                        <span class="font-bold text-black text-xs">Usuario:</span> <span class="text-black text-xs"> {person.name}</span>
                    </div>
                    <div class="box">
                        <span class="font-bold text-black text-xs">CUI:</span> <span class="text-black text-xs"> {person.cui}</span>
                    </div>
                </div>
                <div class="divider bg-black"  style="height:1px;"></div>
                <div class="barcode">
                    <Barcode 
                        value="{person.id}"
                    />
                </div>
            </div>
        </div>
        
    </Page> 
</PrintPdf>
{/each}
{/if}
<style>
    .view {
        width: 90%;
        margin: auto;
        background-color: #fff;
        padding:2em;
        display:grid;
        place-content: center;
    }

    .text {
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 2em 0;
    }

    .container {
        width: 40rem;
    }

    .barcode {
        display: grid;
        place-content: center;
    }
</style>