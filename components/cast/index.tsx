import styles from '@/styles/cast.module.css'
import { castType } from '@/utils/types'
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  cast: castType[];
}

export default function Cast({ cast }: propsObj) {
  return <div className={styles.cast_container}>
    {cast.slice(0, 4).map(element =>
      <div className={styles.cast} key={uuidv4()}>
        <div className={styles.actors}>
          <div className={styles.person} >
            {element.person.image ? <img src={element.person.image.medium} /> : null}
            <span>{element.person.name}</span>
          </div>
        </div>
        <div className={styles.characters}>{element.character.name}</div>
      </div>)}
  </div>
}