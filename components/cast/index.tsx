import styles from '@/styles/cast.module.css'
import { castType } from '@/utils/types'

type propsObj = {
  cast: castType[];
}

export default function Cast({cast} : propsObj) {
  return <div className={styles.cast_container}>
  <h2>Starring</h2>
  <div className={styles.cast}>
    <div className={styles.actors}>
      {cast.slice(0, 4).map(element => 
        <div className={styles.person}><img src={element.person.image.medium}/><span>{element.person.name}</span></div> )}
    </div>
    <div className={styles.characters}>
        {cast.slice(0, 4).map(element => 
        <div>{element.character.name}</div> )}
    </div>
  </div>
</div>
}