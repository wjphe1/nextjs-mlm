import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Productpage from '../../components/productPage'

// Use the staticProps returned below
export default function Product({ name }) {
  const router = useRouter()
  const { pid } = router.query //current route's [pid] (product ID)
  
  return <Productpage pid={pid}/>

}