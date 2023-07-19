<script>
    import { onMount } from "svelte";
    import api from "../config/api";
    import Loading from "../components/Loading.svelte";
    import axios from "axios";

    let projectLoading = true;
    let activitiesLoading = true;
    let certificatesLoading = true;
    let projects = [];
    let activities = [];
    let certificates = [];

    onMount(() => {
        axios.get(api + "/projects").then((res) => {
            projects = res.data;
            setTimeout(() => {
                projectLoading = false;
            }, 300);
            console.log(projects);
        });
        axios.get(api + "/activities").then((res) => {
            activities = res.data;
            setTimeout(() => {
                activitiesLoading = false;
            }, 300);
            console.log(activities);
        }
        );
        axios.get(api + "/certificates").then((res) => {
            certificates = res.data;
            setTimeout(() => {
                certificatesLoading = false;
            }, 300);
            console.log(certificates);
        }
        );  
    }); 
</script>

<div class="bg-white dark:bg-zinc-800 px-3 py-3 dark:text-white text-black rounded-lg shadow min-h-full shadow-orange-500/40">
    
    <h2 class="px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 text-white inline">ผลงาน</h2>
    {#if projectLoading}
        <Loading />
    {:else}
    <div class="grid lg:grid-cols-1 md:grid-cols-1 gap-3.5 my-3">
        {#each projects as project }
        <div class="rounded-lg px-3 py-3 flex flex-wrap border border-orange-500">
            <div class="w-fit">
                <img class="h-auto w-full object-cover object-top rounded-xl" src={project.photoURL} alt={project.name}>
            </div>
            <div class="flex flex-wrap w-auto items-center">
                <div class="w-full"><h2 class="font-bold text-2xl pt-2 text-orange-500">{project.name}</h2></div>
                <div class="w-full"><p>{project.description}</p></div>
                <div class="w-full py-2">
                {#each project.link as link}
                    {#if link.id == 1}
                    <a class="inline-flex px-5 rounded-xl py-2 text-white mr-3 bg-orange-500 items-center hover:underline" href={link.link} target="_blank">{link.label}<span class="px-1"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </a>
                    {:else}
                    <a class="hover:underline" href={link.link} target="_blank">{link.label}</a>
                    {/if}
                {/each}
                </div>                                      
            </div>
        </div>        
        {/each}
    </div>
    {/if}
    
    <h2 class="px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 text-white inline">กิจกรรม</h2>
    {#if activitiesLoading}
        <Loading />
    {:else}
        {#each activities as activity }
        <div class="my-3 grid  lg:grid-cols-2 gap-3.5">
            <div class="text-orange-500 rounded-lg px-3 py-3 flex flex-wrap border border-orange-500">
                <img class="rounded-lg object-cover" src={activity.photoURL} alt={activity.name} >
                <h2 class="flex items-center justify-center mt-2 text-center w-full py-2 font-medium rounded-lg bg-orange-500 text-white">{activity.name}</h2>
            </div>                            
        </div>
        {/each}
    {/if}
    
    <h2 class="px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 text-white inline">ประกาศนียบัตร</h2>
    {#if certificatesLoading}
        <Loading />
    {:else}
    <div class="columns-2 py-3">
        {#each certificates as certificate}
        <div class=" text-orange-500 rounded-lg px-3 py-3 border border-orange-500">
            <img class="rounded-lg object-cover" src={certificate.photoURL} alt={`certificate ใบที่ ${certificate.id}`} >
        </div>
        {/each}
    </div>
    {/if}
    
</div>