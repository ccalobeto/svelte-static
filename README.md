# The missing guide to understanding adapter-static in SvelteKit

[Sveltekit the missing guide](https://khromov.se/the-missing-guide-to-understanding-adapter-static-in-sveltekit/)

## 1.1 Notes
- Sveltekit assumes all routes are dynamic
### 1.1.1 Prerendered route (prerender=true)
![](/images/prerender-route.png)

### 1.1.2 Dynamic route (prerender=false)
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

## 1.3 Using SvelteKit as a traditional SPA (Single Page Application )
Configuration

`routes/+layout.js`
```js
export const prerender = false
export const ssr =  false
```

## 1.4 randomNumber JSON route(prerender = true)
It’s still very useful for prefetching data from a CMS or other data source at build time. Use it if your data doesn't change frequently.

- In any adapter other than the static one, server endpoints will be deployed as dynamic server-side code.

- If you prerender `routes/random-number.json/+server.js`, SvelteKit will create an **output file at build time** for the endpoint and the output will be a `build/random-number.json`. Data is static.

![](/images/randomNumberJSON-route.png)

## 1.5 Server load route (prerender = true)

- In adapter-static the `+page.server.js` code will be out of the output and your functions will fail once you build the app.

- Remember vite doesn't matter these limitations and you can't test this behavior with `npm run preview`.

- Prerendering `server-load` route throws: *server-load.html* and *__data.json* which is more dense.

![](/images/server-load-data.png)
![](/images/server-load-tree.png)
![](/images/server-load.gif)

- *__data.json* file shows only data in this case a static number. Use it when you build static data (like a list of your latest blog posts) and then just rebuild the site once the content changes.

## 1.6 Server and Universal load (prerender=true)

- In non *adapter-static* `+page.js` load functions are called "universal", it means that the load funtion will be executed in the server as a part of SSR and the results will be sent as a serialized data to the client. This two requests are done by once, the process is called **rehydratation**.

- In *adapter-static* the load funtion will run twice: if SSR is enabled (by default) it will generate an HTML and every time the user loads the page with the same output (the preview generates the same random number) and the output client side (in this case a random number executing the function).
![](/images/universal-ssr-enabled.gif)

- If you disable SSR, it will generate a server blank HTML.
![](/images/universal-ssr-disabled.gif)

## 1.7 How does SSR work with static sites
- With **SSR** enabled (by default) and during build time, sveltekit will invoke the load functions in `+page.js` and `+page.server.js` if they exist, and generate a HTML output based on this result. Here the html is not generated because it has't prerender it. 
![](/images/ssr-enabled.gif)
![](/images/ssr-prerender.png)

- The HTML output will never change unless you rebuild the project.

- With **ssr** enabled your site will be benefitiated by **SEO**.

- To disable SSR :
routes/ssr/+page.js
```sh
export const ssr = false
...
```
![](/images/ssr-disabled.gif)


