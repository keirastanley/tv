import styles from '@/styles/info.module.css';
import { showType } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  show: showType,
}

/** Displays the information about where the show can be watched, whether or not its still running and its schedule and genres. */
export default function Info({ show }: propsObj) {

  return <div className={styles.info_container}>
    <h4>{show.webChannel ? `Stream on ${show.webChannel.name}` : show.network ? `Watch on ${show.network.name}` : 'Not currently streaming'}</h4>
    <div className={styles.info}>
      {show.schedule.days.length > 0 ?
        <div className={styles.info_item}>
          <div className={styles.info_headings}>
            {show.schedule.days.length > 0 ? <p>Schedule</p> : null}
          </div>
          <div className={styles.info_content}>
            <p className={styles.days}>
              {show.schedule.days.length === 7 ?
                <span>Everyday</span> :
                show.schedule.days.map((day, ind) => {
                  if (ind === show.schedule.days.length - 1) {
                    return <span key={uuidv4()}>{day}s</span>;
                  }
                  if (ind === show.schedule.days.length - 2) {
                    return <span key={uuidv4()}>{day}s and</span>;
                  }
                  else {
                    return <span key={uuidv4()}>{day}s, </span>;
                  }
                })}
            </p>
          </div>
        </div> : null}
      {show.status ? <div className={styles.info_item}>
        <div className={styles.info_headings}>
          <p>Status</p>
        </div>
        <div className={styles.info_content}>
          <p>{show.status}</p>
        </div>
      </div> : null}
      {show.genres.length > 0 ?
        <div className={styles.info_item}>
          <div className={styles.info_headings}>
            <p>Genres</p>
          </div>
          <div className={styles.info_content}>
            {show.genres.length > 0 ? <p>
              {show.genres.map((genre, ind) =>
                ind < show.genres.length - 1 ?
                  <span key={uuidv4()}>{genre}, </span> :
                  <span key={uuidv4()}>{genre}</span>)}
            </p> : null}
          </div>
        </div>
        : null}
    </div>
  </div>
}