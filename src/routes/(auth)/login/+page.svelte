<script>
    import { enhance } from '$app/forms';
    import toast from 'svelte-french-toast';

    export let form;

    $: if(form?.invalid) toast.error('Usuario y/o contraseña inválidos',{
        style: 'border-radius: 50px; background: #333; color: #fff;'
    })
</script>

<svelte:head>
    <title>Inicio de sesión</title>
</svelte:head>

<div class="view card shadow-xl">
    <form method="post" use:enhance>
        <div class="form-control w-full ">
            <label for="" class="label">
                <span class="label-text" class:text-error={form?.missing || form?.invalid}>Correo electrónico</span>
            </label>
            <input 
                name="email" 
                type="email" 
                placeholder="example@mail.com" 
                class="input input-bordered w-full "
                class:input-error={form?.missing || form?.invalid} 
            />
            <label for="" class="label">
                {#if form?.missing }
                    <span class="label-text-alt text-xs text-error">Correo electrónico inválido</span>
                {/if}
            </label>
        </div>
        <div class="form-control w-full ">
            <label for="" class="label">
                <span class="label-text" class:text-error={form?.incorrect || form?.invalid}>Contraseña</span>
            </label>
            <input 
                name="password" 
                type="password" 
                placeholder="Ingrese su contraseña" 
                class="input input-bordered w-full "
                class:input-error={form?.incorrect || form?.invalid} 
            />
            <label for="" class="label">
                {#if form?.incorrect}
                    <span class="label-text-alt text-xs text-error">Contraseña requerida</span>
                {/if}
            </label>
        </div>
        <button class="btn"> Iniciar sesión </button>
    </form>
</div>

<style>
    .view {
        padding: 2em;
        width: 30rem;
    }
</style>