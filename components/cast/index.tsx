import styles from '@/styles/cast.module.css'
import { castType } from '@/utils/types'
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  cast: castType[];
}

export default function Cast({ cast }: propsObj) {
  return <div className={styles.cast_container}>
    {/* <h2>Starring</h2> */}
    <div className={styles.cast}>
      <div className={styles.actors}>
        {cast.slice(0, 4).map(element =>
          <div className={styles.person} key={uuidv4()}>
            {element.person.image ? <img src={element.person.image.medium} /> : null}
            <span>{element.person.name}</span></div>)}
      </div>
      <div className={styles.characters}>
        {cast.slice(0, 4).map(element =>
          <div key={uuidv4()}>{element.character.name}</div>)}
      </div>
    </div>
  </div>
}