export const ssr = false;
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load({ route }) {
    return {
        post: {
            title: `Title for ${route.id} goes here`,
            content: `Content for ${route.id} goes here`,
            value: Math.random()
        }
    };
}