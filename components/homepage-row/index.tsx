import { scheduleType } from "@/utils/types";
import ShowCard from "../show-card";
import { v4 as uuidv4 } from 'uuid';
import styles from '@/styles/schedule.module.css';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
  schedule: scheduleType[],
  ind1: number,
  ind2: number
}

export default function HomepageRow({ favourites, handleFavourites, schedule, ind1, ind2 }: propsObj) {
  return <div className={styles.schedule}>
    {schedule?.slice(ind1, ind2).map(item =>
      item.show.image ?
        <ShowCard
          show={item.show}
          favourites={favourites}
          handleFavourites={handleFavourites}
          key={uuidv4()}
        /> : null)}
  </div>
}