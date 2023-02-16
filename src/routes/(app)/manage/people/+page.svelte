<script>
    import { enhance } from '$app/forms';
    import { browser } from '$app/environment';

    export let data;
    export let form;

    let community = '';
    let toGen = []

    const handleAll = (e) => {
        const nodes = document.querySelectorAll('.checkbox')
        nodes.forEach(node => {
            node.checked = e.target.checked;
        })
        if(e.target.checked) {
            let gen = form?.people.map(obj => JSON.stringify(obj));
            let clean = new Set([...gen]);
            toGen = [...clean];
            browser && localStorage.setItem('gen',JSON.stringify(toGen))
        } else {
            toGen = []
            browser && localStorage.setItem('gen',JSON.stringify(toGen))
        }
    }
    
    const handleOne = (e) => {
        if(e.target.checked) {
            let selected = form?.people.find(item => item.id === e.target.id);
            let objStr = JSON.stringify(selected);
            let clean = new Set([...toGen,objStr]);
            toGen = [...clean];
            browser && localStorage.setItem('gen',JSON.stringify(toGen))
        } else {
            let dataObjects = toGen.map(str => JSON.parse(str))
            .filter(obj => obj.id !== e.target.id);
            let strObjects = dataObjects.map(obj => JSON.stringify(obj));
            let clean = new Set([...strObjects]);
            toGen = [...clean]
            browser && localStorage.setItem('gen',JSON.stringify(toGen))
        }
    }
</script>

<svelte:head>
    <title>Beneficiarios</title>
</svelte:head>

<div class="view p-8">
    <h2 class="text-3xl">Beneficiarios</h2>
    <div class="divider"></div>
    {#if data?.communities?.length}
    <div class="actions">
        <a href="/manage/people/add" class="btn btn-ghost text-success">Registrar un beneficiario</a>
        <a href="/manage/people/addmany" class="btn btn-ghost text-info">Cargar Listado</a>
    </div>
    <form class="mt-4" action="?/getUsersByLocation" method="post" use:enhance>
        <div class="form-control">
            <div class="input-group">
                <select name="community" class="select select-bordered" bind:value={community} >
                    <option disabled value="" class="text-white" selected>Selecciona una comunidad</option>
                    {#each data.communities as item}
                    <option value="{item.id}">{item.name}</option>
                    {/each}
                </select>
                <button class="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
    </form>
    {:else}
    <h2 class="text-center text-3xl text-primary font-bold">Por favor primero registra una comunidad</h2>
    {/if}
    {#if form?.people}
        {#if toGen.length}
        <div class="gen-button">
            <a href="/manage/people/generate" class="btn text-xs btn-ghost text-accent btn-xs">generar todo</a>
        </div>
        {/if}
        {#if form.people.length}
        <div class="overflow-x-auto w-full mt-8">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input on:change={handleAll} type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <th>Nombre</th>
                        <th>CUI</th>
                        <th>Fecha nacimiento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each form.people as person}
                    <tr>
                        <th>
                            <label>
                                <input on:change={handleOne} id="{person.id}" type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>{person.name}</td>
                        <td>{person.cui}</td>
                        <td>{person.birth || 'Pendiente'}</td>
                        <th>
                            <a href="/manage/people/generate/{person.id}" class="btn text-xs btn-ghost text-accent btn-xs">generar</a>
                            <button class="btn text-xs btn-ghost text-info btn-xs">detalles</button>
                        </th>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {/if}
    {/if}
</div>

<style>
    .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .gen-button {
        display:flex;
        justify-content: flex-end;
        width:100%;
    }
</style>