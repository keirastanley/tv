import ShowCard from "@/components/show-card";
import { getShow, getShows } from "@/utils/requests";
import { showType } from "@/utils/types";
import { useEffect, useState } from "react";
import styles from '@/styles/favourites.module.css';
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function Favourites({ favourites, handleFavourites }: propsObj) {
  const [shows, setShows] = useState<showType[]>([])

  useEffect(() => {
    getShows(favourites).then((response) => setShows(response))
  }, [])

  return <div className={styles.container}>{shows.map(show => <ShowCard show={show} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
}