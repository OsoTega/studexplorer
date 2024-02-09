"use client"
import useMediaQuery from '@/hooks/use-media-query';
import React from 'react'

const Footer = () => {
  const isDesktop = useMediaQuery("(min-width: 740px)");
  if(isDesktop){
    return (
      <div className='text-center mt-[140px] mb-[40px] md:mt-[200px]'>
          <p className='text-muted-foreground'>
              This is a non-profit service to students of Swansea University, 
              any profit made goes <br></br> back into making the service better, FEEL FREE TO DONATE,
               AWS IS NOT CHEAP  😁😁😁
          </p>
          <p>
            &copy; {new Date().getFullYear()}
          </p>
      </div>
    )
  }
}

export default Footer