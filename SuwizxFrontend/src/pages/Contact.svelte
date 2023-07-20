<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import Loading from "../components/Loading.svelte";
    import api from "../config/api";
  import { link } from "svelte-routing";

    let contactLoading = true;
    let socialLoading = true;
    let mapLoading = true;
    let fristLoading = true;

    let phone
    let mail
    let socials = [];
    let map = [];

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
    <div class=" text-orange-500 rounded-lg px-3 py-3 border border-orange-500 mt-3">
        <p class="dark:text-white text-black">33 หมู่ 18 ตำบลบ้านควน อำเภอหลังสวน จังหวัดชุมพร 86110</p>
        <iframe class="mt-2 w-full h-96 rounded-lg" title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1965.60352734326!2d99.05650065796317!3d9.832969998241472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7fc06eefb9fbd220!2zOcKwNDknNTguNyJOIDk5wrAwMycyNy4zIkU!5e0!3m2!1sth!2sth!4v1665851678867!5m2!1sth!2sth" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</div>
