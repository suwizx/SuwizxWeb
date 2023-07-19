<script>
    import { onMount } from "svelte";
    import axios from "axios";

    import api from "../config/api.js";

    import Loading from "./Loading.svelte";

    let isLoad = false;
    let contactLoad = false;
    let emailLoad = false;
    let userdata = [{}]
    let userContact = [{}]
    let userPhoto
    let userEmail
    let userDisplayName

    onMount(() => {
        isLoad = true;
        emailLoad = true;
        contactLoad = true;
        axios.get(api + "/sidebar").then((res) => {
            userdata = res.data
            setTimeout(() => {
                isLoad = false;
            }, 200);
        });
        axios.get(api + "/sidebar/photoURL").then((res) => {
            userPhoto = res.data.vaule
            console.log(userPhoto);
        });
        axios.get(api + "/socials").then((res) => {
            userContact = res.data
            setTimeout(() => {
                contactLoad = false;
            }, 400);
        });
        axios.get(api + "/socials/mail").then((res) => {
            userEmail = res.data.link
            setTimeout(() => {
                emailLoad = false;
            }, 400);
        });
        axios.get(api + "/sidebar/displayName").then((res) => {
            userDisplayName = res.data.vaule
        });
    })
</script>

<div class="md:sticky md:top-16">
    
    <div class=" bg-white dark:bg-zinc-800 px-5 py-5 rounded-lg shadow shadow-orange-500/40">
        {#if isLoad}
            <Loading />   
        {:else}
            {#if userPhoto}    
            <div class="flex items-center justify-center">
                <img class="h-14 w-14 object-cover object-top rounded-full" src={userPhoto} alt={`รูปโพรไฟล์`}>
            </div>
            {/if}
            <div class="pt-2">
                {#if userDisplayName}
                <h1 class="text-xl text-center font-medium py-2">I'm <span class="text-orange-500">{userDisplayName}</span></h1>
                {/if}
                <div class="mx-auto w-fit">
                    {#each userdata as data}
                    <h2 class="text-orange-500">{data.field} : <span class="dark:text-white text-black">{data.vaule}</span></h2>
                    {/each}
                </div>
                {#if contactLoad}
                <div class="pt-4 flex justify-center w-full gap-2 animate-pulse">
                    <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                    <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                    <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                    <div class="rounded-full dark:bg-zinc-700 bg-zinc-200 h-6 w-6"></div>
                </div>
                {:else}
                <div class="pt-4 flex justify-center w-full">
                    {#each userContact as contacts}             
                        <a class="px-1 hover:text-orange-500" href={contacts.link} target="_blank">{@html contacts.svgLogo}</a>
                    {/each}
                </div>
                {/if}

                {#if emailLoad}
                <div class="animate-pulse rounded-full dark:bg-zinc-700 bg-zinc-200 h-2 w-[80%] mx-auto my-3"></div>
                {:else}
                <div class="flex justify-center pt-2">
                        <a class="flex items-center decoration-solid hover:underline text-sm" href={`mailto://${userEmail}`}>{userEmail}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                        </svg></a>
                </div>
                {/if}
                
            </div>
            
            
        {/if}
                   
    </div>
</div>