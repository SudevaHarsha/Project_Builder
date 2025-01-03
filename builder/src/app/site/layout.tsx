import Navigation from '@/components/site/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  // there was an clerk provider warpped here
  return <main className='h-full'>
    <Navigation />
    {children}
  </main>
}

export default layout