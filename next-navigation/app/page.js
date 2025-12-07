"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
const page = () => {
  const pathname = usePathname();
  return (
    <div>
      Hey this is our page
      Current pathname is : {pathname}
    </div>
  )
}

export default page
