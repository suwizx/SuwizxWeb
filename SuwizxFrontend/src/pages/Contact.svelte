<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Loading from "../components/Loading.svelte";
    import api from "../config/api";

    let contactLoading = true;
    let socialLoading = true;
    let mapLoading = true;

    let phone
    let mail
    let map = []
    let socials = []

    onMount (() => {
        axios.get(api + "/socials/mail").then((res) => {
            mail = res.data;
            setTimeout(() => {
                contactLoading = false;
            }, 300);
        });
    
        axios.get(api + "/socials/phone").then((res) => {
            phone = res.data;
            setTimeout(() => {
                contactLoading = false;
            }, 300);
        });
        

        axios.get(api + "/socials").then((res) => {
            socials = res.data;
            setTimeout(() => {
                socialLoading = false;
            }, 300);
        });

        axios.get(api + "/map").then((res) => {
            map = res.data;
            setTimeout(() => {
                mapLoading = false;
            }, 300);
        });

        axios.get(api + "/contact").then((res) => {
            map = res.data;
            setTimeout(() => {
                mapLoading = false;
            }, 300);
        });
    })
    

</script>

<div class="bg-white dark:bg-zinc-800 px-3 py-3 dark:text-white text-black rounded-lg shadow min-h-full shadow-orange-500/40">
    <h2 class="text-white px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 inline mb-3">ติดต่อ</h2>
    <div class="flex-wrap text-orange-500 rounded-lg px-3 py-3 border border-orange-500 mt-3 flex items-center justify-between">
        <div>
            {#if contactLoading}
            <div class="animate-pulse block">
                <div class="bg-zinc-700 mt-2 max-w-[120px] w-[120px] h-4 rounded-full"></div>
                <div class="bg-zinc-700 mt-2 max-w-[120px] w-[120px] h-4 rounded-full"></div>
            </div>
            {:else}
            <a class="w-full flex items-center" href={`mailto://${mail.link}`}><span class="pr-2">{@html mail.svgLogo}</span>{mail.link}</a>
            <a class="w-full flex items-center" href={`tel:${phone.link}`}><span class="pr-2">{@html phone.svgLogo}</span>{phone.link}</a>
            
            {/if}
        </div>
        <div class="flex justify-end items-center">
            {#if socialLoading}
            
            <div class="flex justify-center w-full gap-2 animate-pulse">
                <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
            </div>
            {:else}
            {#each socials as social}
            <a class="pr-1" href={social.link} target="_blank">
                {@html social.svgLogo}
            </a>    
            {/each}
            {/if}
        </div>
    </div>
    {#if mapLoading}
        <Loading />
    {:else}
    <div class=" text-orange-500 rounded-lg px-3 py-3 border border-orange-500 mt-3">
        {#each map as data }    
        <p class="dark:text-white text-black">{data.address}</p>
        {@html data.embed}
        {/each}
    </div>
    {/if}
</div>
