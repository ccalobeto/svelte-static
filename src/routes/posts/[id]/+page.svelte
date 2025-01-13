<script>
	import { base } from '$app/paths';

	let { data } = $props();
</script>

<a href="{base}/">Back</a>
<br />

<h1>{data.post.title}</h1>
<p>{data.post.body}</p>
