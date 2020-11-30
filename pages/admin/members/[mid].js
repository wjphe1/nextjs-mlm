import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../components/admin/layout'
import Editmemb from '../../../components/admin/edit_member'

export default function Members({ name }) {
  const router = useRouter()
  const { mid } = router.query //current route's [mid] (member ID)

  return <Layout page={'users'}>
      <Head>
        <title>{name} - Edit Member</title>
      </Head>

      <Editmemb mid={mid}/>
  </Layout>
}