import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useEffect, useMemo, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [favourites, setFavourites] = useState<number[]>([])

  useEffect(() => {
    const initialFavourites = JSON.parse(localStorage.getItem('favourites') as string);
    setFavourites(initialFavourites);
  }, [])

  useEffect(() => {
    console.log(favourites)
  }, [favourites])


  function handleFavourites(id: number) {
    console.log(id)
    if (favourites.includes(id)) {
      let newFavourites = favourites.filter(item => item !== id);
      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
    else {
      let newFavourites = [...favourites, id];
      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
  }

  return <>
    <Header />
    <Component {...pageProps} favourites={favourites} handleFavourites={handleFavourites} />
    <Footer />
  </>
}
