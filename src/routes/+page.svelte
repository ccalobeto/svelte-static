<script>
	let { data } = $props();
</script>

<h1>Menu of adapter-static</h1>
<p>Visit <a href="./prerendered">prerendered route</a></p>
<p>Visit <a href="./dynamic">dynamic route</a></p>
<p>Visit <a href="./random-number.json">random-number route</a></p>
<p>Visit <a href="./server-load">server-load route</a></p>
<p>Visit <a href="./server-and-universal">server-and-universal route</a></p>
<p>Visit <a href="./ssr">ssr route</a></p>

<h1>Blog posts</h1>
{#each data.posts as post}
	<h2>{post.title}</h2>
	<a href="./posts/{post.id}">Read more of post {post.id}</a>
{/each}
