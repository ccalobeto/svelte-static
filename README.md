# The missing guide to understanding adapter-static in SvelteKit

[Sveltekit the missing guide](https://khromov.se/the-missing-guide-to-understanding-adapter-static-in-sveltekit/)

# Table of Content
- [11 Notes](#11-notes)
- [12 Understanding trailingSlash](#12--understanding-trailingslash)
- [13 Using svelkit as a SPA](#13-using-sveltekit-as-a-traditional-spa-single-page-application)
- [14 randomNumber json](#14-randomnumber-json-routeprerendertrue-commit)
- [15 Server load](#15-server-load-route-prerender--true)
- [16 Universal load](#16-server-and-universal-load-prerendertrue)
- [17 How SSR work with static sites](#17-how-does-ssr-work-with-static-sites)
- [18 Prerender SSG](#18-prerendering-ssg)

## 1.1 Notes
- Sveltekit assumes all routes are dynamic
### 1.1.1 Prerendered route (prerender=true) [commit](https://github.com/ccalobeto/svelte-static/commit/34843e02f8bfbad953d323566617a2005a80c8f5)
![](/images/prerender-route.png) 

### 1.1.2 Dynamic route (prerender=false) [commit](https://github.com/ccalobeto/svelte-static/commit/c304da93649a60f3395e28fb783f36fc21fd7b8b)
![](/images/dynamic-route-tree.png)
![](/images/dynamic-route-deploy.png)

- Route flow
![](/images/route-flow.png)


## 1.2  Understanding trailingSlash
Changes the name of the build output from `/route-name.html` to /`route-name/index.html`.

`routes/+layout.js`
```js
export const trailingSlash = 'always'
```

## 1.3 Using SvelteKit as a traditional SPA (Single Page Application)
Configuration

`routes/+layout.js`
```js
export const prerender = false
export const ssr =  false
```

## 14. randomNumber JSON route(prerender=true) [commit](https://github.com/ccalobeto/svelte-static/commit/3a21193278f828dba7673903f637f6a050288005)
It’s still very useful for prefetching data from a CMS or other data source at build time. Use it if your data doesn't change frequently.

- In any adapter other than the static one, server endpoints will be deployed as dynamic server-side code.

- If you prerender `routes/random-number.json/+server.js`, SvelteKit will create an **output file at build time** for the endpoint and the output will be a `build/random-number.json`. Data is static.

![](/images/randomNumberJSON-route.png)

## 1.5 Server load route (prerender = true) [commit](https://github.com/ccalobeto/svelte-static/commit/86a67b68c22c98ee61f9d052c1185ddaaa9517da)

- In adapter-static the `+page.server.js` code will be out of the output and your functions will fail once you build the app.

- Remember vite doesn't matter these limitations and you can't test this behavior with `npm run preview`.

- Prerendering `server-load` route throws: *server-load.html* and *__data.json* which is more dense.

![](/images/server-load-data.png)
![](/images/server-load-tree.png)
![](/images/server-load.gif)

- *__data.json* file shows only data in this case a static number. Use it when you build static data (like a list of your latest blog posts) and then just rebuild the site once the content changes.

## 1.6 Server and Universal load (prerender=true) [commit](https://github.com/ccalobeto/svelte-static/commit/0c6b6fe6e8ee548c7d61a99aacd35e2638709e24)

- In non *adapter-static* `+page.js` load functions are called "universal", it means that the load funtion will be executed in the server as a part of SSR and the results will be sent as a serialized data to the client. This two requests are done by once, the process is called **rehydratation**.

- In *adapter-static* the load funtion will run twice: if SSR is enabled (by default) it will generate an HTML and every time the user loads the page with the same output (the preview generates the same random number) and the output client side (in this case a random number executing the function).
![](/images/universal-ssr-enabled.gif)

- If you disable SSR, it will generate a server blank HTML.
![](/images/universal-ssr-disabled.gif)

## 1.7 How does SSR work with static sites
- With **SSR** enabled (by default) and during build time, sveltekit will invoke the load functions in `+page.js` and `+page.server.js` if they exist, and generate a HTML output based on this result. Here the html is not generated because it has't prerender it. [commit](https://github.com/ccalobeto/svelte-static/commit/27ae7197354f98069c9da03fc17cfb87be95e8af)
![](/images/ssr-enabled.gif)
![](/images/ssr-prerender.png)

- The HTML output will never change unless you rebuild the project.

- With **ssr** enabled your site will be benefitiated by **SEO**.

- To disable SSR [commit](https://github.com/ccalobeto/svelte-static/commit/d1f71f3813b0f7b8a19b19931da4117efb186bcd):
routes/ssr/+page.js
```sh
export const ssr = false
...
```
![](/images/ssr-disabled.gif)

## 1.8 Prerendering (SSG)
We are going to display our blog using adapter-static in **Github Pages**. 

- We create our server load function in `routes/+page.server.js` to be displayed in our main page `routes/+page.svelte`. [commit](https://github.com/ccalobeto/svelte-static/commit/673487846e128e55225bcee869a8d255bcad82f8)
It will look like this
![](/images/blog-dev.png)

- We can't build because we haven't already create the individual post (dynamic route), it throws this error
![](/images/blog-build-error.png)

- Let's create `routes/posts/[id]/+page.server.js` and `routes/posts/[id]/+page.svelte` for individual post [commit](https://github.com/ccalobeto/svelte-static/commit/a2eb20af66c2f650b7b5eda296340f7c15685d11). Now we can build the project, it looks like
![](/images/blog-build-ok.png)

- [commit](https://github.com/ccalobeto/svelte-static/commit/0c7630c6bc71979ca08a38c40225785228973eea)

>[!IMPORTANt]
> In `<a>` tags change '/posts' with './posts'.

