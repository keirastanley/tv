import { scheduleType } from "@/utils/types";
import ShowCard from "../show-card";
import styles from '@/styles/guide.module.css';

export default function Guide({ schedule }: any) {
  const time = new Date().toString().split(" ")[4].split(":").slice(0, 2).join(":")

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
    <h2>What's on today</h2>
    <table className={styles.table}>
      {guide.slice(index).map(item =>
        <thead className={styles.table_head}>
          {item.time}
          {item.shows.map(item =>
            <tbody className={styles.table_body}>
              <ShowCard show={item.show} />
            </tbody>)}
        </thead>)}
    </table>
  </div> : null
}