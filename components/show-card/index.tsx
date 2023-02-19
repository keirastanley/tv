import Image from 'next/image';
import { Stars } from '@/utils/functions';
import { showType } from '@/utils/types';
import styles from '@/styles/show_card.module.css'

type propsObj = {
  show: showType,
}

export default function ShowCard({ show }: propsObj) {

  return <div className={styles.container}>
    {show.image ?
      <img src={show.image.medium} alt={show.name} width={120} height={170} /> :
      <img src='/blank-movie.png' alt={show.name} width={120} height={170} />}
    <p>{show.name}</p>
    <div>{show.rating.average ? <Stars rating={show.rating.average / 2} /> : null}</div>
  </div>
}