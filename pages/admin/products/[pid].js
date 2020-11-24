import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Editprod from '../../../components/admin/edit_prod'

// Use the staticProps returned below
export default function Product({ data, name }) {
  const router = useRouter()
  const { pid } = router.query //current route's [pid] (product ID)
  
  return <Layout page={'products'}>
      <Head>
        <title>{name} - Edit Product</title>
      </Head>
      <Editprod pid={pid}/>
  </Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id

  // For API request
  const array = ['fbb05f20-eb9e-42d3-a50a-62782928a588', 'fbb05f20-eb9e-42d3-a50a-62782928a58', '3', '4', '5']
  const paths = array.map(u =>({
    params: {pid: u},
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

  const data = ['1']

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  }
}