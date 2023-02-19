import styles from '@/styles/header.module.css'

export default function Header() {
  return <header> 
    <div className={styles.container}>
      <img src="/retro-tv.png"></img>
      <h1>Neverbland.tv</h1>
    </div>
  </header>
}