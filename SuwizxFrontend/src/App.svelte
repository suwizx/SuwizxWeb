<script>
// @ts-nocheck

  import { Router, Route, Link } from "svelte-routing";
  import { onMount } from "svelte";

  import Home from "./pages/Home.svelte";
  import Header from "./components/Header.svelte";
  import InfoCard from "./components/InfoCard.svelte";

  let isDark = false;

  onMount(() => {
    if (localStorage.getItem("DarkTheme") === null) {
      localStorage.setItem(
        "DarkTheme",JSON.stringify(window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    isDark = JSON.parse(localStorage.getItem("DarkTheme"));
  });

  $: document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
  $: localStorage.setItem("DarkTheme", JSON.stringify(isDark));

  const switchMode = () => {
	isDark = !isDark;
  }

</script>

<main class="bg-zinc-100 dark:bg-zinc-900 font-LineSeed text-black dark:text-white min-h-screen transition">
  <Header switchMode={switchMode} isDark={isDark} />
  <div class="py-20 max-w-6xl mx-auto px-10 flex flex-wrap">
	<div class="lg:w-3/12 md:w-5/12 w-full mb-5">
		<InfoCard />
	</div>
	<div class="lg:w-9/12 md:w-7/12 w-full">
		<Router>
		  <Route path="/" component={Home} />
		</Router>
	</div>
  </div>
</main>
