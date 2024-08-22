import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-[100%] flex justify-center items-center'>
      <UserButton afterSignOutUrl='/' />
      <Button>Builder</Button>
    </div>
  )
}

export default page