import styles from '@/styles/info.module.css'
import { showType } from '@/utils/types'

type propsObj = {
  show: showType;
}

export default function Info({ show }: propsObj) {

  console.log(show.webChannel)

  return <div className={styles.info_container}>
    <h2>Show Info</h2>
    {show.webChannel ? `Streamed on ${show.webChannel.name}` : 'Not currently streaming'}
    <div className={styles.info}>
      <div className={styles.info_headings}>
        <p>Schedule</p>
        <p>Status</p>
        <p>Genres</p>
      </div>
      <div className={styles.info_content}>
        <p>{show.schedule.days.map(day => <span>{`${day}s`}</span>)}</p>
        <p>{show.status}</p>
        {show.genres.map((genre, ind) => ind < show.genres.length - 1 ? <span>{genre}, </span> : <span>{genre}</span>)}
      </div>
    </div>
  </div>
}