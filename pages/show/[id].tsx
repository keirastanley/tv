import { Stars } from "@/components/stars";
import { castType, showType } from "@/utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import styles from '@/styles/show_page.module.css';
import { getCast, getShow } from "@/utils/requests";
import Cast from "@/components/cast";
import Info from "@/components/info";
import Heart from "@/components/heart";

type propsObj = {
  favourites: number[],
  handleFavourites: Function
}

export default function ShowPage({ favourites, handleFavourites }: propsObj) {
  const router = useRouter();
  const id = router.query.id;
  const [show, setShow] = useState<showType>();
  const [cast, setCast] = useState<castType[]>();

  useEffect(() => {
    if (id) {
      getShow(id as string).then((response) => setShow(response));
      getCast(id as string).then((response) => setCast(response));
    }
  }, [id])

  return <>{show ? <div className={styles.main_container} data-cy={show.id}>
    <div className={styles.header}>
      <div className={styles.image}>
        {show.image && show.image.original ? <img src={show.image.original} /> : <img src='/blank-movie.png' alt={show.name} />}
        <Heart favourites={favourites} handleFavourites={handleFavourites} show={show} showPage={true} />
      </div>
      <div className={styles.main_details}>
        {show.rating.average ? <div className={styles.rating}><Stars rating={show.rating.average / 2} /> <p>{show.rating.average / 2}</p></div> : null}
        <h1>{show.name}</h1>
        <div className={styles.description}>{parse(show.summary)}</div>
      </div>
    </div>
    <div className={styles.more_details}>
      <Info show={show} />
      {cast ? <Cast cast={cast} /> : null}
    </div>
  </div>
    : null}
  </>
}