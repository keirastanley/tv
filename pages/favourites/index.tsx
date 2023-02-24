import ShowCard from "@/components/show-card";
import { getShows } from "@/utils/requests";
import { showType } from "@/utils/types";
import { useEffect, useState } from "react";
import styles from '@/styles/favourites.module.css';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from "next/link";

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

/** If the user has favourited any shows they see their cards displayed here. If not, they can see a message informing them. */
export default function Favourites({ favourites, handleFavourites }: propsObj) {
  const [shows, setShows] = useState<showType[]>();

  useEffect(() => {
    getShows(favourites).then((response) => setShows(response))
  }, [favourites])

  return <div className={styles.container}>
    {shows && shows.length > 0 ?
      <>
        <div className={styles.card_container}>
          {shows.map(show =>
            <ShowCard
              show={show}
              favourites={favourites}
              handleFavourites={handleFavourites}
              key={uuidv4()}
            />)}
        </div>
      </> : <div className={styles.text}>
        <h2>You haven&#39;t added any favourites yet</h2>
        <div>
          <p>Click the <AiOutlineHeart /> on any show to add it to your favourites.</p>
          <p>You can find shows in your <Link href="/guide" style={{ textDecoration: "underline", cursor: "pointer" }}>guide</Link>, by searching for its name or from the <Link href="/" style={{ textDecoration: "underline", cursor: "pointer" }}>homepage</Link>.</p>
        </div>
      </div>}
  </div>
}