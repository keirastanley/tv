import { getSearchResults } from "@/utils/requests"
import { showType } from "@/utils/types";
import { useEffect, useState } from "react"
import ShowCard from "../show-card";
import styles from '@/styles/search.module.css';

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<showType[]>()

  function search() {
    getSearchResults(query).then((response) => {
      const data = response.map(item => item.show);
      setResults(data);
    })
  }

  useEffect(() => {
    console.log(results)
  }, [results])

  return <>
    <input
      onChange={(event) => setQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          search();
        }
      }}
    ></input>
    <div className={styles.results_container}>{results ? results.map(item => <ShowCard show={item} />) : null}</div>
  </>
}