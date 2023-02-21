import { scheduleType, showType } from "@/utils/types";
import ShowCard from "@/components/show-card";
import styles from '@/styles/guide.module.css';
import { getSchedule } from "@/utils/requests";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function Guide({ favourites, handleFavourites }: propsObj) {
  const [schedule, setSchedule] = useState<scheduleType[]>();
  const time = new Date().toString().split(" ")[4].split(":").slice(0, 2).join(":");

  let times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  type guideType = {
    time: string;
    shows: scheduleType[];
  }[]

  let guide: guideType = [];
  let guideObj: { [key: string]: scheduleType[] } = {};

  useEffect(() => {
    getSchedule().then((response) => {
      setSchedule([...response])
    })
  }, [])

  if (schedule) {
    for (let i = 0; i < schedule.length; i++) {
      for (let j = 0; j < times.length; j++) {
        let timeNumber = Number(times[j].split(":")[0]);
        let airtimeNumber = Number(schedule[i].airtime.split(":")[0]);
        if (timeNumber === airtimeNumber) {
          if (guideObj[times[j]]) {
            guideObj[times[j]] = [...guideObj[times[j]], schedule[i]]
          }
          else {
            guideObj[times[j]] = [schedule[i]]
          }
        }
      }
    }
  }

  for (const property in guideObj) {
    guide.push({ time: property, shows: guideObj[property] })
  }

  let index = 0;
  for (let i = 0; i < guide.length; i++) {
    if (Number(time.split(":")[0]) <= Number(guide[i].time.split(":")[0])) {
      index = i;
      break;
    }
  }

  return guide ? <div className={styles.guide_container}>
    <table className={styles.table}>
      <h2 style={{ textAlign: "center" }}>What's on today</h2>
      {/* <div className={styles.search}><input type="date"></input><button onClick={searchByDate}>Search</button></div> */}
      {guide.slice(index).map(item =>
        <thead className={styles.table_head}>
          <div className={styles.time}>{item.time}</div>
          <div className={styles.shows}>{item.shows.map(item =>
            <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
        </thead>)}
    </table>
  </div> : null
}