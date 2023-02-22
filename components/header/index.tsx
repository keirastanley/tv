import styles from '@/styles/header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import { useState } from 'react';
import Search from '../search';

export default function Header() {

  const [searching, setSearching] = useState(false);

  return <header>
    <div className={styles.container}>
      <div className={styles.icon}>
        <Link href='/'>
          {/* <img src="/neverblandtv_logo.png"></img> */}
          <h1>Neverbland.tv</h1>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.main_links}>
          <Link href='/'>Home</Link>
          <Link href='/guide'>Guide</Link>
          <Link href='/favourites'>Favourites</Link>
        </div>
        <div className={styles.search_section}>
          <AiOutlineSearch onClick={() => setSearching(true)} />{searching ? <Search setSearching={setSearching} /> : null}
        </div>
      </div>
    </div>
  </header>
}