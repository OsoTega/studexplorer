import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

const GifComponent = () => {
    const [gif, setGif] = useState("");

    useEffect(()=>{
      fetch(`https://api.giphy.com/v1/gifs/search?q=waiting&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`,{
        method: 'GET'
      }).then(async (e)=>{
        const {data} = await e.json();
        const selectedGif = Math.floor(Math.random() * (data.length -1));
        setGif(data[selectedGif].images.downsized_medium.url)
      })
    }, [])

  return (
    <div className='w-full flex justify-center items-center'>
      {gif.length > 0 ? (
         <Image src={gif} width={400} height={400} alt='gif'/>
      ) : (
        <Loader2 className='w-10 h-10 animate-spin'/>
      )}
    </div>
  )
}

export default GifComponent