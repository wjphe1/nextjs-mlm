import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Editcate from '../../../components/admin/edit_category'

// Use the staticProps returned below
export default function Category({ posts, name }) {
  const router = useRouter()
  const { cid } = router.query //current route's [cid] (category ID)

  return <Layout page={'products'}>
      <Head>
        <title>{name} - Edit Category</title>
      </Head>

      <Editcate cid={cid}/>
  </Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  // For API request
  //const request  = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  //const array = await request.json()

  const array = ['7205fd60-c9a4-4abe-b46b-7b540a901b5b', '2', '3', '4', '5']
  const paths = array.map(u =>({
    params: {cid: u},
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  const posts = [{id: 1, name: 'one'}, {id: 2, name: 'two'}]

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}