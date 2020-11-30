import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Editcate from '../../../components/admin/edit_category'

// Use the staticProps returned below
export default function Category({ name }) {
  const router = useRouter()
  const { cid } = router.query //current route's [cid] (category ID)

  return <Layout page={'products'}>
      <Head>
        <title>{name} - Edit Category</title>
      </Head>

      <Editcate cid={cid}/>
  </Layout>
}