import React from 'react'

const page = ({ params }: { params: { domain: string } }) => {
  return (
    <div>{params?.domain}</div>
  )
}

export default page