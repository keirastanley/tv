import styles from '@/styles/header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import { useState } from 'react';
import Search from '../search';

/**Contains the links to each page on the site and the search bar*/
export default function Header() {
  const [searching, setSearching] = useState(false);

  return <header>
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.icon}>
          <Link href='/'>
            <h1>Neverbland.tv</h1>
          </Link>
        </div>
        <div className={styles.main_links}>
          <Link href='/' data-cy="home">Home</Link>
          <Link href='/guide' data-cy="guide">Guide</Link>
          <Link href='/favourites' data-cy="favourites">Favourites</Link>
        </div>
      </div>
      <div className={styles.search_section}>
        <div onClick={() => setSearching(true)} data-cy="search_icon"><AiOutlineSearch /></div>{searching ? <Search setSearching={setSearching} /> : null}
      </div>
    </div>
  </header>
}