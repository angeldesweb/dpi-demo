<script>
    export let data;
    let date = null;
    let community = ''
</script>


<div class="view p-8">
    <h2 class="text-3xl">Nueva Jornada</h2>
    <div class="divider"></div>
    {#if data?.communities && data.communities.length}
    <label for="fcc">Seleccione la fecha</label>
    <input id="fcc" type="date" class="input input-bordered w-full mt-4" bind:value={date}>
    <select id="" class="select select-bordered w-full mt-4" bind:value={community}>
        <option selected disabled value="">Seleccione una comunidad</option>
        {#each data.communities as doc}
        <option value="{doc.id}">{doc.name}</option>
        {/each}
    </select>
    <button class="btn btn-info text-white mt-4" disabled={!date || !community }>Añadir jornada</button>
    {/if}
</div>