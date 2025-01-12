<script>
	/** @type {{ data: import('./$types').PageData }} */

	let { data } = $props();
	console.log(data);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
<p>value: {data.post.value}</p>
