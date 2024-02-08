import React from 'react'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

const GifComponent = () => {
    const gf = new GiphyFetch(`${process.env.NEXT_PUBLIC_GIPHY_API_KEY}`)

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = (offset: number) => gf.search('waiting',{ sort: "recent", limit: 1, type: 'videos' })
  return (
    <Grid width={800} columns={3} fetchGifs={fetchGifs}  />
  )
}

export default GifComponent