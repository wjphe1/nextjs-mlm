# Sample PYG TECH NEXT-JS PWA Boilerplate

This is a reusable skeleton for Next-js with PWA installed.

## Features

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

* **Static Generation** is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
* **Server-side Rendering** is the pre-rendering method that generates the HTML on each request.


These plugins are already installed and ready to use 

* SASS : Can write & read scss files with no problems
* Next-pwa : Will generate a serviceworker.js upon deployment. Manifest.json and required icons are prepared too.
* classnames : Can use conditional className for example:

```js
import cn from 'classnames'
import styles from './styles.module.scss'

<div className={cn({
    [styles.success]: type === 'success',
    [styles.error]: type === 'error'
})}>
    Hello World!
</div>
```

## Usage

1. **Adding Static pages** : Pages are all server rendered. To add new page, just add a new <page>.js file under /pages/ and boom, there's your new page.
2. **Adding Dynamic pages** : Pages that begin with [ and end with ] are dynamic routes. Example: [id].js (please refer to the file to see the structure of a dynamic page).
3. **Persist Components (Navbar)** : Refer to /components/layout.js for the layout design, then wrap all your pages js file with that layout. Example:

```js
import Head from 'next/head'
import Layout from '../../components/layout'

export default function Index() {
  return (
    <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>Hello World!</h1>
    </Layout>
  )
}
```
4. **Customized META** : With reference to the example above, each js created can include a <Head></Head> section wrapping all your desired meta tags for that current page.
5. **CSS** : styles can be written in 3 ways ->
    * **inline jsx** : Include the following lines in your js file:
    ```jsx
    <style jsx>{`
        // styles go here
    `}</style>
    ```
    * **Global css** : Add scss files in the /styles/ folder and import them in your js files. The classNames are called by string
    * **Module css** : An example of module css file goes like this: *style.module.scss*. These module css are made to be scoped in specific component files. These styles must be called by importing as a variable
    ```jsx
    import styles from '../styles/style.module.scss'
    
    ...
    <div className={styles.container}>Hello World!</div>
    ...
    ```
6. **Images** : Please place new images in /public/images/.
7. **General META** : General Meta tags are currently placed in /components/_meta.js.

