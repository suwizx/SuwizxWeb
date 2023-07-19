<script>
    import axios from "axios";
    import {onMount} from "svelte";
    import api from "../config/api";
    import { Link } from "svelte-routing";
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import BsSun from "svelte-icons-pack/bs/BsSun";
    import BsMoon from "svelte-icons-pack/bs/BsMoon";

    export let switchMode;
    export let isDark;

    let isMobileMenu = false;
    $: switchModeIcon = isDark ? BsSun : BsMoon ;

    let userdata = ""

    onMount(() => {
        axios.get(api + "/sidebar/photoURL").then((res) => {
            userdata = (res.data.vaule);
        });
    })
</script>

<header>
    <div class="flex items-center px-4 py-4 flex-warp fixed top-0 w-full">
        <nav class="flex justify-between w-full ">
            {#if userdata}
                <img class="md:flex hidden h-10 w-10 object-cover object-top rounded-full" src={userdata} alt={`รูปโพรไฟล์`}>
            {:else}
                <div class="md:flex hidden h-10 w-10 object-cover object-top rounded-full"></div>
            {/if}
            <ul class="md:flex hidden rounded-full text-black dark:text-white px-3 drop-shadow-md bg-zinc-300/50 dark:bg-zinc-700/50 menu-border shadow-orange-500/40 shadow backdrop-blur-sm">
                <li><Link to="/" class=" px-3 py-2  block hover:text-orange-500 orange-h">โพรไฟล์</Link></li>
                <li><Link to="/works" class=" px-3 py-2  block hover:text-orange-500 orange-h">ผลงาน</Link></li>
                <li><a href="https://blog.suwizx.dev" class=" px-3 py-2  block hover:text-orange-500 orange-h">บทความ</a></li>
                <li><Link to="/contact" class=" px-3 py-2 block hover:text-orange-500 orange-h">ติดต่อ</Link></li>
            </ul>
            <button on:click={switchMode} class={!isDark ? 'h-fit flex items-center px-4 py-2 text-white bg-gradient-to-r rounded-full shadow-orange-500/40 shadow backdrop-blur  from-rose-500/90 to-orange-500/90' : 'h-fit flex items-center px-4 py-2 text-white bg-gradient-to-r rounded-full shadow-white/40 shadow backdrop-blur  from-zinc-700 to-zinc-900' }>
                <span>
                    <Icon src={switchModeIcon} />
                </span>
            </button>

              <!-- mobie -->
              <div class="flex flex-wrap justify-end w-fit md:hidden">
                <button id="menu-btn" on:click={() => {isMobileMenu = !isMobileMenu}} class="shadow-orange-500/40 shadow backdrop-blur-sm md:hidden text-black dark:text-white dark:text-black bg-zinc-300/50 dark:bg-zinc-700/50 menu-border rounded-full text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">Menu <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <!-- Dropdown menu -->
                {#if isMobileMenu}                
                <div class="w-full flex justify-end mt-2 z-50">
                    <div id="menu-list" class="md:hidden z-10 w-44 bg-zinc-300/50 dark:bg-zinc-700/50 menu-border backdrop-blur-sm rounded divide-y divide-gray-100 shadow-orange-500/40 shadow">
                        <ul class="py-1 text-sm dark:text-white text-black">
                        <li>
                            <Link to="/" class="w-full text-start block py-2 px-4">โพรไฟล์</Link>
                        </li>
                        <li>
                            <Link to="/works" class="w-full text-start block py-2 px-4 ">ผลงาน</Link>
                        </li>
                        <li>
                            <a href="https://blog.suwizx.dev" class="w-full text-start block py-2 px-4 ">บทความ</a>
                        </li>
                        <li>
                            <Link to="/contact" class="w-full text-start block py-2 px-4 ">ติดต่อ</Link>
                        </li>
                        </ul>
                    </div>
                  </div>
                  {/if}
                </div> 
        </nav>
    </div>
</header>