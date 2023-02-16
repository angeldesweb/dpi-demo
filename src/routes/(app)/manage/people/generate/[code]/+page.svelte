<script>
    import PrintPdf, { Page } from 'svelte-printpdf';
    import Barcode from 'svelte-barcode'
    export let data;

    let print = false;

    const handlePrint = () => {
        print = true;
    }

</script>

<button class="btn btn-ghost text-success" on:click={handlePrint}>Imprimir</button>
<PrintPdf bind:print={print}>
    <Page>
        <div class="view">
            <div class="container">
                <h2 class="text-3xl text-black font-bold text-center">Código de usuario</h2>
                <div class="text">
                    <div class="box">
                        <span class="font-bold text-black text-xs">Usuario:</span> <span class="text-black text-xs"> {data.doc.name}</span>
                    </div>
                    <div class="box">
                        <span class="font-bold text-black text-xs">CUI:</span> <span class="text-black text-xs"> {data.doc.cui}</span>
                    </div>
                </div>
                <div class="divider bg-black"  style="height:1px;"></div>
                <div class="barcode">
                    <Barcode 
                        value="{data.id}"
                    />
                </div>
            </div>
        </div>
    </Page>
</PrintPdf>

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