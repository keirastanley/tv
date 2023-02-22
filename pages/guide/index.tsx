import { scheduleType, showType } from "@/utils/types";
import ShowCard from "@/components/show-card";
import styles from '@/styles/guide.module.css';
import { getSchedule } from "@/utils/requests";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { compareDates } from "@/utils/functions";
import ClockLoader from 'react-spinners/ClockLoader';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function Guide({ favourites, handleFavourites }: propsObj) {
  const [schedule, setSchedule] = useState<scheduleType[]>();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const today = new Date();

  console.log("guide");

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
    setLoading(true);
    getSchedule(date).then((response) => {
      setSchedule([...response]);
    }).then(() => setLoading(false));
  }, [date]);

  if (schedule) {
    for (let i = 0; i < schedule.length; i++) {
      for (let j = 0; j < times.length; j++) {
        let timeNumber = Number(times[j].split(":")[0]);
        let airtimeNumber = Number(schedule[i].airtime.split(":")[0]);
        if (timeNumber === airtimeNumber) {
          if (guideObj[times[j]]) {
            guideObj[times[j]] = [...guideObj[times[j]], schedule[i]];
          }
          else {
            guideObj[times[j]] = [schedule[i]];
          }
        }
      }
    }
  }

  for (const property in guideObj) {
    guide.push({ time: property, shows: guideObj[property] });
  }

  let index = 0;
  for (let i = 0; i < guide.length; i++) {
    if (Number(time.split(":")[0]) <= Number(guide[i].time.split(":")[0])) {
      index = i;
      break;
    }
  }

  function handleDate(direction: string) {
    if (direction === "left") {
      setDate(new Date(date.setDate(date.getDate() - 1)));
    }
    if (direction === "right") {
      setDate(new Date(date.setDate(date.getDate() + 1)));
    }
  }

  return <div className={styles.guide_container}>
    {loading ? <ClockLoader
      color={"white"}
      // loading={loading}
      // cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    /> : <div className={styles.table}>
      <div className={styles.date}>
        {compareDates(date, today) ? null : <BiLeftArrow onClick={() => handleDate("left")} />}
        <p>{date.toString().slice(0, 10)}</p>
        {/* <p>{time}</p> */}
        <BiRightArrow onClick={() => handleDate("right")} />
      </div>
      {compareDates(date, today) ? guide.slice(index).map(item =>
        <div className={styles.table_head} key={uuidv4()}>
          <div className={styles.time}>{item.time}</div>
          <div className={styles.shows}>{item.shows.map(item =>
            <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
        </div>) : guide.map(item =>
          <div className={styles.table_head} key={uuidv4()}>
            <div className={styles.time}>{item.time}</div>
            <div className={styles.shows}>{item.shows.map(item =>
              <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
          </div>)}
    </div>}
  </div>
}