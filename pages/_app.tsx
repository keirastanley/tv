import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/header';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // The functionality for favouriting shows is handled here so that it can be accessed throughout the site. As a quick fix to replace the need for a database or authorisation, favourites are stored in localstorage. If this were a larger project, I would have a hosted backend where each user's favourites were stored and "get", "post", "patch" and "delete" requests would be handled in utils/requests.tsx. I would also use a tool like Auth0 to allow user's to login and out and only see their own favourites in the favourites section.

  const [favourites, setFavourites] = useState<number[]>([])

  useEffect(() => {
    if (localStorage.getItem('favourites')) {
      const initialFavourites = JSON.parse(localStorage.getItem('favourites') as string);
      setFavourites(initialFavourites);
    }
  }, [])

  function handleFavourites(id: number) {
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
  </>
}
