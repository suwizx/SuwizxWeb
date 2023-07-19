<script>
// @ts-nocheck

  import { Router, Route, Link } from "svelte-routing";
  import { onMount } from "svelte";

  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Works from "./pages/Work.svelte";

  import Header from "./components/Header.svelte";
  import InfoCard from "./components/InfoCard.svelte";

  let isDark;

  onMount(() => {
    if (localStorage.getItem("DarkTheme") === null || localStorage.getItem("DarkTheme") === "undefined") {
      localStorage.setItem(
        "DarkTheme",JSON.stringify(window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    isDark = JSON.parse(localStorage.getItem("DarkTheme"));
  });

  $: document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');

  const switchMode = () => {
	isDark = !isDark;
  localStorage.setItem("DarkTheme", JSON.stringify(isDark));
  }

</script>

<Router>
<main class="bg-zinc-100 dark:bg-zinc-900 font-LineSeed text-black dark:text-white min-h-screen transition">
  <Header switchMode={switchMode} isDark={isDark} />
  <div class="py-20 max-w-6xl mx-auto px-10 flex flex-wrap">
	<div class="lg:w-3/12 md:w-5/12 w-full mb-5">
		<InfoCard />
	</div>
	<div class="lg:w-9/12 md:w-7/12 w-full">
    <div class="md:ml-5">
        <Route path="/" component={Home} />
        <Route path="/*" component={NotFound} />
        <Route path="/works" component={Works} />
      </div>
    </div>
  </div>
</main>
</Router>
