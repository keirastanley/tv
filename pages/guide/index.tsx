import { guideType, scheduleType, showType } from "@/utils/types";
import ShowCard from "@/components/show-card";
import styles from '@/styles/guide.module.css';
import { getSchedule } from "@/utils/requests";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { compareDates, createGuide, getCurrentTimeString, getIndex } from "@/utils/functions";
import ClockLoader from 'react-spinners/ClockLoader';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function Guide({ favourites, handleFavourites }: propsObj) {
  const [guide, setGuide] = useState<guideType[]>();
  const [index, setIndex] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const time = getCurrentTimeString(new Date());

  useEffect(() => {
    setLoading(true);
    getSchedule(date).then((response) => {
      setGuide(createGuide([...response]));
    });
  }, [date]);

  useEffect(() => {
    if (guide) {
      setIndex(getIndex(time, guide));
      setLoading(false);
    }
  }, [guide])

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
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    /> : <div className={styles.table}>
      <div className={styles.date}>
        {compareDates(date, today) ? null : <div onClick={() => handleDate("left")} data-cy="left_arrow"><MdKeyboardArrowLeft /></div>}
        <p data-cy="date">{date.toString().slice(0, 10)}</p>
        <div onClick={() => handleDate("right")} data-cy="right_arrow"><MdKeyboardArrowRight /></div>
      </div>
      {compareDates(date, today) ? guide?.slice(index).map(item =>
        <div className={styles.table_head} key={uuidv4()}>
          <div className={styles.time}>{item.time}</div>
          <div className={styles.shows}>{item.shows.map(item =>
            <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
        </div>) : guide?.map(item =>
          <div className={styles.table_head} key={uuidv4()}>
            <div className={styles.time}>{item.time}</div>
            <div className={styles.shows}>{item.shows.map(item =>
              <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
          </div>)}
    </div>}
  </div>
}