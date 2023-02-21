import { getSearchResults } from "@/utils/requests"
import { showType } from "@/utils/types";
import { useEffect, useState } from "react"
import ShowCard from "../show-card";
import { useRouter } from "next/router";
import styles from '@/styles/search.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search({ setSearching }: any) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return <div className={styles.container}>
    <div className={styles.input_container}>
      <input
        className={styles.input}
        onBlur={() => setSearching(false)}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            router.push(`/search/${query}`)
          }
        }}
        autoFocus={true}
      ></input>
    </div>
  </div>
}