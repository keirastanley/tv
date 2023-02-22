import ShowCard from "../show-card"
import { scheduleType, showType } from "@/utils/types"
import styles from '@/styles/schedule.module.css'
import { useEffect, useState } from "react"
import { getSchedule, getStreaming } from "@/utils/requests";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { v4 as uuidv4 } from 'uuid';
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "../loader";
import ClipLoader from "react-spinners/ClipLoader";

type propsObj = {
  favourites: number[];
  handleFavourites: Function;
}

export default function Schedule({ favourites, handleFavourites }: propsObj) {
  const [schedule, setSchedule] = useState<scheduleType[]>();
  const [streaming, setStreaming] = useState<showType[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSchedule(new Date()).then((response) => {
      setSchedule([...response]);
      setLoading(false);
    })
    getStreaming().then((response) => {
      console.log(response);
      setStreaming([...response]);
    })
  }, [])

  return <div className={styles.main_container}>
    <div className={styles.schedule}>{schedule?.slice(0).map(item => <ShowCard show={item.show} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
    <div className={styles.schedule}>{schedule?.slice(20).map(item => <ShowCard show={item.show} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
    <div className={styles.schedule}>{schedule?.slice(40).map(item => <ShowCard show={item.show} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
    <div className={styles.schedule}>{schedule?.slice(60).map(item => <ShowCard show={item.show} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}</div>
  </div>
}