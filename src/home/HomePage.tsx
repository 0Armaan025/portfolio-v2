import CustomLaptop from '@/components/laptop/CustomLaptop'
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
      <div className="homePage bg-white">
        <CustomLaptop/>
      </div>
    </>
  )
}

export default HomePage