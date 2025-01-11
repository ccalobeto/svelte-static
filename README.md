# The missing guide to understanding adapter-static in SvelteKit

[Sveltekit the missing guide](https://khromov.se/the-missing-guide-to-understanding-adapter-static-in-sveltekit/)

### 1.1 Notes
- Sveltekit assumes all routes are dynamic
- Prerender the *prerendered* project route
- Not prerender `routes/dynamic`
![](/images/not-prerender-dynamic.png)
- Route flow
![](/images/route-flow.png)

### 1.2  Understanding trailingSlash
Changes the name of the build output from `/route-name.html` to /`route-name/index.html`.

`routes/+layout.js`
```js
export const trailingSlash = 'always'
```

### 1.3 Using SvelteKit as a traditional SPA (Single Page Application )
Configuration
`routes/+layout.js`
```js
export const prerender = false
export const ssr =  false
```

### 1.4 +server.js endpoints
It’s still very useful for prefetching data from a CMS or other data source at build time. Use it if your data doesn't change frequently.

- In any adapter other than the static one, server endpoints will be deployed as dynamic server-side code.

- If you prerender `routes/random-number.json/+server.js`, SvelteKit will create an **output file at build time** for the endpoint and the output will be a `build/random-number.json`.

### 1.5 +page.server.js load functions

- The +page.server.js code will be out of the output and your functions will fails onece you build the app.

- Vite doesn't matter these limitations and you can't test this behavior with `npm run preview`.

- Prerendering `server-load` route throws: *server-load.html* and *__data.json*
![](/images/page-server-prerender-1.png)
![](/images/page-server-prerender-2.png)

- *__data.json* shows only a static number. Use it when you build static data (like a list of your latest blog posts) and then just rebuild the site once the content changes.


