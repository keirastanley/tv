import Link from 'next/link';
import { Stars } from '@/components/stars';
import { showType } from '@/utils/types';
import styles from '@/styles/show_card.module.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

type propsObj = {
  show: showType,
  airtime?: string,
  favourites: number[],
  handleFavourites: Function,
}

export default function ShowCard({ show, airtime, favourites, handleFavourites }: propsObj) {

  return <div className={styles.container}>
    <Link href={`/show/${show.id}`}><div className={styles.image_container}>
      <div className={styles.info}>
        <p>{show.name}</p>
        {show.network ? <p>{show.network.name}</p> : show.webChannel ? <p>{show.webChannel.name}</p> : <p></p>}
        <p>{airtime}</p>
        <div>{show.rating.average ? <Stars rating={show.rating.average / 2} /> : null}</div>
      </div>
      {show.image && show.image.medium ?
        <img src={show.image.medium} alt={show.name} /> :
        <img src='/placeholder_image.png' alt={show.name} />}
    </div></Link>
    <div onClick={() => handleFavourites(show.id)} style={{ fontSize: "20px", cursor: "pointer" }}>
      {favourites.includes(show.id) ? <AiFillHeart className={styles.heart_fill} /> : <AiOutlineHeart className={styles.heart_outline} />}
    </div>
  </div>
}