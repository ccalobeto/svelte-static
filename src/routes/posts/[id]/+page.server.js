export async function load({ params }) {
  const id = params.id;
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  const post = await response.json();

  return {
      post
  };
}

export const prerender = true;