import { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/search.module.css';

export default function Search({ setSearching }: any) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return <div className={styles.container}>
    <div className={styles.input_container}>
      <input
        data-cy="search_input"
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