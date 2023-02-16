<script>
    import { Community , UserPlus , LeftExpand } from '$lib/components';
</script>

<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
                <LeftExpand/>
            </label>
            <div class="p-4">
                <slot/>
            </div>
        </div> 
        <div class="drawer-side shadow-xl">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
            <li class="menu-title">
                <span class="tag">Administrar</span>
            </li>
            <li><a href="/manage" class="tag"><Community/> Comunidades</a></li>
            <li><a href="/manage/people" class="tag"><UserPlus/> Beneficiarios</a></li>
        </ul>
    </div>
</div>

<style>
    .drawer {
        height: 90%;
        z-index: 2;
    }

    .tag {
        display: flex;
        align-items: center;
    } 
</style>