import { scheduleType } from "@/utils/types";
import styles from '@/styles/schedule.module.css';
import { useEffect, useState } from "react";
import { getSchedule } from "@/utils/requests";
import ClipLoader from "react-spinners/ClipLoader";
import HomepageRow from "../homepage-row";
import { getHomepageIndexes } from "@/utils/functions";
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  favourites: number[];
  handleFavourites: Function;
}

export default function Homepage({ favourites, handleFavourites }: propsObj) {
  const [schedule, setSchedule] = useState<scheduleType[]>();
  const [loading, setLoading] = useState(true);
  const [indexes, setIndexes] = useState<any[]>();

  useEffect(() => {
    getSchedule(new Date()).then((response) => {
      setSchedule([...response]);
    });
  }, []);

  useEffect(() => {
    if (schedule) {
      setIndexes(getHomepageIndexes(schedule.length));
    }
  }, [schedule]);

  useEffect(() => {
    if (indexes) {
      setLoading(false);
    }
  }, [indexes]);

  return loading ?
    <div className={styles.loader}>
      <ClipLoader color="white" />
    </div> :
    <div className={styles.main_container}>
      {schedule ?
        indexes?.map(element =>
          <HomepageRow
            schedule={schedule}
            favourites={favourites}
            handleFavourites={handleFavourites}
            ind1={element.ind1}
            ind2={element.ind2}
            key={uuidv4()} />
        ) : null}
    </div>
}