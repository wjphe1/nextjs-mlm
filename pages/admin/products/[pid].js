import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Editprod from '../../../components/admin/edit_prod'

// Use the staticProps returned below
export default function Product({ name }) {
  const router = useRouter()
  const { pid } = router.query //current route's [pid] (product ID)
  
  return <Layout page={'products'}>
      <Head>
        <title>{name} - Edit Product</title>
      </Head>
      <Editprod pid={pid}/>
  </Layout>
}