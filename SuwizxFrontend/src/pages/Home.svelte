<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import api from "../config/api.js";
    import Loading from "../components/Loading.svelte";

    let educations = [];
    let eduLoad = true;
    let skills = [];
    let skillLoad = true;

    onMount(() => {
        axios.get(api+"/educations").then((res) => {
            educations = res.data;
            setTimeout(() => {
                eduLoad = false;
            }, 300);
        });
        axios.get(api+"/skills").then((res) => {
            skills = res.data;
            setTimeout(() => {
                skillLoad = false;
            }, 300);
        });
    });

</script>

<div class="bg-white dark:bg-zinc-800 px-3 py-3 dark:text-white text-black rounded-lg shadow min-h-full shadow-orange-500/40">
    
    <h2 class=" px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 text-white inline">การศึกษา</h2>

    {#if eduLoad}
        <Loading />
    {:else}
    <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-3.5 my-3">
        {#each educations as school }    
            <div class="text-orange-500 rounded-lg px-3 py-3 flex flex-wrap border border-orange-500">
                <div class="w-fit pr-3">
                    <img class="h-14 w-14 mb-2 object-cover object-top rounded-full" src={school.photoURL} alt={school.name}>
                </div>
                <div class="flex flex-wrap w-10/12 items-center">
                    <div class="w-full"><h2 class="font-bold">{school.name}</h2></div>
                    <div class="w-full"><p class="dark:text-white text-black">{school.address}</p></div>
                    <div class="w-full"><a class="flex items-center hover:underline" href={school.aboutLink} target="_blank">รายละเอียดเพิ่มเติม<span class="px-1"></span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg></a></div>                                      
                </div>
            </div>
            {/each}
        </div>
    {/if}
    
    <div>
        <h2 class="text-white px-1.5 text-sm font-bold py-1 rounded-lg bg-orange-500 inline">ทักษะ</h2>
        {#if skillLoad}
        <Loading />
        {:else}
        <div class="my-3 grid lg:grid-cols-3 md:grid-cols-2 gap-3.5">
            {#each skills as skill}
            <div class="text-orange-500 rounded-lg px-3 py-3 border border-orange-500">
                <div class="flex justify-between mb-1">
                    <span class="text-base font-medium orange-500 flex items-center">
                        <span class="pr-1">
                            {@html skill.svgFile}
                        </span>{skill.name}
                    </span>
                    <span class="text-sm font-medium text-orange-500">{skill.level}%</span>
                  </div>
                  <div class="w-full dark:bg-zinc-700 bg-zinc-200 rounded-full h-2.5">
                    <div class="bg-orange-500 h-2.5 rounded-full" style={`width: ${skill.level}%`}></div>
                  </div>
            </div>
            {/each}
        </div>
        {/if}
    </div>
</div>