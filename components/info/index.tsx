import styles from '@/styles/info.module.css';
import { showType } from '@/utils/types';
import { scheduler } from 'timers/promises';
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  show: showType;
}

export default function Info({ show }: propsObj) {

  return <div className={styles.info_container}>
    <h4>{show.webChannel ? `Stream on ${show.webChannel.name}` : show.network ? `Watch on ${show.network.name}` : 'Not currently streaming'}</h4>
    <div className={styles.info}>
      <div className={styles.info_headings}>
        {show.schedule.days.length > 0 ? <p>Schedule</p> : null}
        {show.status ? <p>Status</p> : null}
        {show.genres.length > 0 ? <p>Genres</p> : null}
      </div>
      <div className={styles.info_content}>
        {show.schedule.days.length > 0 ? <p className={styles.days}>
          {show.schedule.days.length === 7 ?
            <span>Everyday</span> :
            show.schedule.days.map((day, ind) =>
              ind < show.schedule.days.length ?
                <span key={uuidv4()}>{day}s, </span> :
                <span key={uuidv4()}>and {day}s`</span>)}
        </p> : null}
        {show.status ? <p>{show.status}</p> : null}
        {show.genres.length > 0 ? <p>
          {show.genres.map((genre, ind) =>
            ind < show.genres.length - 1 ?
              <span key={uuidv4()}>{genre}, </span> :
              <span key={uuidv4()}>{genre}</span>)}
        </p> : null}
      </div>
    </div>
  </div >
}