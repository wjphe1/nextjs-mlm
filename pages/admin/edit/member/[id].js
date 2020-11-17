import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/admin/layout'
import Newcate from '../../../../components/admin/new_category'

// Use the staticProps returned below
export default function Members({ posts, name }) {
  return <Layout page={'users'}>
      <Head>
        <title>{name} - {posts[0].name}</title>
      </Head>

      <Newcate/>
  </Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  // For API request
  //const request  = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  //const array = await request.json()

  const array = ['1', '2', '3', '4', '5']
  const paths = array.map(u =>({
    params: {id: u},
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