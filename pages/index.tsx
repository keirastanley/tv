import Head from 'next/head';
import Homepage from '@/components/homepage';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

/** The Homepage component is rendered here. This page also contains the metadata about the site and its icon */
export default function Home({ favourites, handleFavourites }: propsObj) {
  return (
    <>
      <Head>
        <title>Neverbland.tv</title>
        <meta name="description" content="Find out what's on TV, search for shows and save your favourites." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/retro-tv.png" />
      </Head>
      <Homepage favourites={favourites} handleFavourites={handleFavourites} />
    </>
  )
}

