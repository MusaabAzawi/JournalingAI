<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/Journal">Journal</a></li>
		<li><a href="/AllJournaling">AllJournaling</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>


<style>
   nav {
	display: flex;
	gap: 1rem;
	padding: 1rem;
	background-color: #f8f9fa;
  }
  a {
	text-decoration: none;
	color: #0070f3;
  }
  a:hover {
	text-decoration: underline;
  }


</style>

{@render children()}
