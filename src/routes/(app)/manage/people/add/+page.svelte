<script>
    import { enhance } from '$app/forms';

    export let form;
    export let data;

    let community = '';
</script>

<svelte:head>
    <title>Añadir Beneficiario</title>
</svelte:head>

<div class="view p-8">
    <h2 class="text-3xl">Nuevo Beneficiario</h2>
    <div class="divider"></div>
    <form method="post" use:enhance>
        {#if data?.communities}
        <select name="community" class="select select-bordered w-full" bind:value={community} >
            <option disabled value="" class="text-white" selected>Selecciona una comunidad</option>
            {#each data.communities as item}
            <option value="{item.id}">{item.name}</option>
            {/each}
        </select>
        {/if}
        <br>
        {#if community}
        <div class="form-control w-full mt-2">
            <label for="" class="label">
                <span class="label-text" class:text-error={form?.incorrect || form?.invalid}>Nombre</span>
            </label>
            <input 
                name="name" 
                type="text" 
                placeholder="Nombre del beneficiario" 
                class="input input-bordered w-full "
                class:input-error={form?.incorrect || form?.invalid} 
            />
            <label for="" class="label">
                {#if form?.incorrect}
                    <span class="label-text-alt text-xs text-error">Dato inválido</span>
                {/if}
            </label>
        </div>
        <div class="form-control w-full ">
            <label for="" class="label">
                <span class="label-text" class:text-error={form?.incorrect || form?.invalid}>CUI</span>
            </label>
            <input 
                name="cui" 
                type="text" 
                placeholder="CUI" 
                class="input input-bordered w-full "
                class:input-error={form?.incorrect || form?.invalid} 
            />
            <label for="" class="label">
                {#if form?.incorrect}
                    <span class="label-text-alt text-xs text-error">Dato inválido</span>
                {/if}
            </label>
            <div class="form-control w-full ">
                <label for="" class="label">
                    <span class="label-text" class:text-error={form?.incorrect || form?.invalid}>Fecha de nacimiento</span>
                </label>
                <input 
                    name="birth" 
                    type="date" 
                    placeholder="Ingrese su contraseña" 
                    class="input input-bordered w-full "
                    class:input-error={form?.incorrect || form?.invalid} 
                />
                <label for="" class="label">
                    {#if form?.incorrect}
                        <span class="label-text-alt text-xs text-error">Dato inválido</span>
                    {/if}
                </label>
            </div>
        </div>
        <button class="btn"> Registrar </button>
        {/if}
    </form>
</div>