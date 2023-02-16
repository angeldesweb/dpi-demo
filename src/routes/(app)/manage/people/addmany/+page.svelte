<script>
    import { enhance } from '$app/forms';
    import { read } from 'xlsx';
    import { handleFile } from '$lib/utils/readXLSX';
    import { Table } from '$lib/components';

    export let data;
    export let form;

    $: community = '';
    $: list = {headers:[],body:[]};
    $: users = [];
    $: success = false;

    const handleChange = async (e) => {
        const fileList = e.target.files;
        if(fileList.length) {
            let data = await fileList[0].arrayBuffer();
            let workbook = read(data);
            let table = Object.values(workbook.Sheets);
            let items = Object.entries(table[0]).filter(arr => !arr[0].startsWith('!'));
            list = handleFile(items)
        }
    };

    $: if(list.body && list.body?.length) { 
        users = list.body
        .map(arr => ({name:arr[0],cui:arr[1],birth:Date(arr[2]),community}))
        users = JSON.stringify(users); 
    };

    $: if(form?.success) {
        community = '';
        list = {headers:[],body:[]};
        users = [];
        success = true;
    }

    $: console.log(form);
</script>

<div class="view p-8">
    <h2 class="text-3xl">Agregar listado</h2>
    <div class="divider"></div>
    <select name="community" class="select select-bordered" bind:value={community} >
        <option disabled value="" class="text-white" selected>Selecciona una comunidad</option>
        {#each data.communities as item}
        <option value="{item.id}">{item.name}</option>
        {/each}
    </select>
    {#if !community}
        {#if success}
        <div class="alert alert-success shadow-lg mt-4">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>El listado ha sido cargado con éxito en la base de datos</span>
            </div>
            <div class="flex-none">
                <button class="btn btn-sm btn-ghost" on:click={() => success = false}>Cerrar</button>
            </div>
        </div>
        {:else}
            <h2 class="text-center text-2xl my-4">Seleccione una comunidad</h2>
        {/if}
    {:else}
        {#if !users.length}
        <div class="form-control w-full max-w-xs">
            <label for="" class="label">
                <span class="label-text">Seleccione un archivo</span>
            </label>
            <input 
                on:change={handleChange}
                type="file" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                class="file-input file-input-bordered w-full max-w-xs"
                class:file-input-error={list.error} 
            />
            <label for="" class="label">
                <span class="label-text-alt text-error">
                    {list?.error ? list.error : ''}
                </span>
            </label>
        </div>
        {:else}
        <div class="alert shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 class="font-bold">Precaución</h3>
                    <div class="text-xs">Por favor verifique los registros antes de almacenar</div>
                </div>
            </div>    
        </div>
        <form method="post" class="buttons my-4" use:enhance>
            <button class="btn btn-ghost text-success" formaction="?/addmany&users={users}">Registrar todos los elementos</button>
            <button class="btn btn-ghost text-error">Descartar selección</button>
        </form>
        <div class="divider"></div>
        <br>
        <Table headers={list.headers} rows={list.body} />
        {/if}
    {/if}
</div>

<style>
    .buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>