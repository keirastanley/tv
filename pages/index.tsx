import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Schedule from '@/components/schedule'

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function Home({ favourites, handleFavourites }: propsObj) {
  return (
    <>
      <Head>
        <title>Neverbland.tv</title>
        <meta name="description" content="Find out what's on TV with descriptions of each show" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/retro-tv.png" />
      </Head>
      <Schedule favourites={favourites} handleFavourites={handleFavourites} />
    </>
  )
}
