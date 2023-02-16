<script>
    export let headers;
    export let rows;
</script>

<div class="overflow-x-auto">
    <table class="table w-full">
        <thead>
            <tr>
                <th></th>
                {#each headers as header}
                <th>{header}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rows as row , i}
            <tr>
                <th>{i}</th>
                {#each row as item}
                    <td>{item}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>