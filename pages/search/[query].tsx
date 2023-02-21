import styles from '@/styles/results.module.css';
import { getSearchResults } from "@/utils/requests"
import { scheduleType, showType } from "@/utils/types";
import { useEffect, useState } from "react";
import ShowCard from '@/components/show-card';
import { useRouter } from "next/router";
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function SearchResults({ favourites, handleFavourites }: propsObj) {
  const [results, setResults] = useState<scheduleType[]>();
  const router = useRouter();
  const query = router.query.query as string;

  useEffect(() => {
    getSearchResults(Number(query)).then((response: scheduleType[]) => {
      setResults(response);
    })
  })

  return <>
    <div className={styles.results_container}>{results ? results.map(item => <Link href={`/show/${item.show.id}`}><ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} /></Link>) : null}</div>
  </>
}