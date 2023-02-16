<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import PocketBase from 'pocketbase';
    import toast from 'svelte-french-toast';
    import { SquareRoundedPlus } from '$lib/components';
    import { enhance } from '$app/forms';

    let name = '';
    let modal;
    $: edit = '';
    $: toDel = '';
    $: list = [];

    const getDocs = async (pb) => {
        let request = await pb.collection('communities').getList();
        list = request.items.map(item => ({...item}))
    }

    const succesNote = (msg) => toast.success(msg,{
        style: 'border-radius: 50px; background: #333; color: #fff;'
    })

    const handleUpdate = ({action}) => {
        succesNote('Actualizado con éxito');
        name = '';
        edit = '';
    }
    const handleDelete = ({action}) => {
        succesNote('Eliminado con éxito');
        toDel = '';
        modal.click();
    }

    const cancelDelete = () => {
        toDel = '';
    }

    onMount( async () => {
        const pb = new PocketBase('https://dpi-pocket.pockethost.io');

        pb.collection('communities').subscribe('*',e => {
            let actions = ['create','update','delete']
            if(actions.includes(e.action)) getDocs(pb) 
        })

        getDocs(pb);
    })
</script>

<svelte:head>
    <title>Comunidades</title>
</svelte:head>

<div class="view p-8">
    <h2 class="text-3xl">Comunidades</h2>
    <div class="divider"></div>
    <form action="?/addcommunity" method="post" use:enhance={({ form, data, action, cancel }) => {
        return async ({result}) => {
            if(result.type === 'success') {
                succesNote('Registrado con éxito');
                name = '';
            }
        }
    }}>
        <div class="form-control">
            <div class="input-group">
                <input bind:value={name} disabled={!!edit} name="name" type="text" placeholder="Nombre de comunidad" class="input input-bordered" />
                <button type="submit" class="btn" disabled={!name}>
                    <SquareRoundedPlus/>
                </button>
            </div>
        </div>
    </form>
    <br>
    {#if list.length}
        {#each list as item, i}
        <div transition:fly class="item card p-4 shadow-xl">
            {#if !edit || edit !== item.id}
            <p>Comunidad: <span class="font-bold text-xl font-bold ">{item.name}</span></p>
            {:else}
            <input value={item.name} on:change={e => name = e.target.value} name="name" type="text" placeholder="{item.name}" class="input input-bordered input-xs" />
            {/if}
            <div class="item-btns">
                {#if !edit || edit !== item.id}
                    <button class="btn btn-ghost text-info text-xs" on:click={() => edit = item.id} >editar</button>
                    <label on:keypress={() => toDel = item.id} for="my-modal" class="btn btn-ghost text-error text-xs" on:click={() => toDel = item.id}>elimnar</label>
                {:else}
                    <button class="btn btn-ghost text-info text-xs" on:click={() => edit = ''}>cancelar</button>
                    <form method="POST" use:enhance={handleUpdate} style="display:inline-block">
                        <button 
                            formaction="?/updateCommunity&name={name}&id={item.id}" 
                            class="btn btn-ghost text-success text-xs"
                        >guardar</button>
                    </form>
                {/if}
            </div>
        </div>
        {/each}
    {:else}
    <h2 class="text-2xl text-center">No se encontraron elementos</h2>
    {/if}
</div> 

<input type="checkbox" id="my-modal" class="modal-toggle" bind:this={modal} />
<div class="modal">
    <div class="modal-box relative md:ml-4">
        <h3 class="font-bold text-lg">¿Seguro de que desea eliminar?</h3>
        <p class="py-4">Esta acción es irreversible y puede afectar a otras colecciones relacionadas a este registro.</p>
        <div class="modal-action">
            <label for="my-modal" class="btn text-info btn-ghost" on:click={cancelDelete} on:keypress={cancelDelete}>cancelar</label>
            <form method="POST" use:enhance={handleDelete} style="display:inline-block">
                <button 
                    formaction="?/deleteCommunity&id={toDel}" 
                    class="btn btn-ghost text-error text-xs"
                >eliminar</button>
            </form>
        </div>
    </div>
</div>

<style>
    .item {
        display: flex;
        gap: 1em;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;;
    }

    .modal {
        z-index: 9;
    }
</style>