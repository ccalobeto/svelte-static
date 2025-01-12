export async function load({ params }) {
  const response = await fetch('https://dummyjson.com/posts');
  const posts = await response.json();
  const first10posts = posts.posts.slice(0, 10);
  return {
      posts: first10posts,
  };
}

export const prerender = true;