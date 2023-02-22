import styles from '@/styles/results.module.css';
import { getSearchResults } from "@/utils/requests"
import { scheduleType, showType } from "@/utils/types";
import { useEffect, useState } from "react";
import ShowCard from '@/components/show-card';
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
}

export default function SearchResults({ favourites, handleFavourites }: propsObj) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<scheduleType[]>();
  const router = useRouter();
  const query = router.query.query as string;

  useEffect(() => {
    setLoading(true);
    getSearchResults(query).then((response: scheduleType[]) => {
      setResults(response);
    }).then(() => setLoading(false));
  }, [query]);

  return <div className={styles.results_container}>
    {loading ? <ClipLoader color="white" /> : results?.map(item =>
      <ShowCard show={item.show} airtime={item.airtime} favourites={favourites} handleFavourites={handleFavourites} key={uuidv4()} />)}
  </div>
}