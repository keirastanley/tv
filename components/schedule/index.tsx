import ShowCard from "../show-card"
import { scheduleType, showType } from "@/utils/types"
import { v4 as uuidv4 } from 'uuid'
import Link from "next/link"
import styles from '@/styles/schedule.module.css'
import { useEffect, useState } from "react"
import { getSchedule, getShow, getStreaming } from "@/utils/requests"
import Guide from "../guide"

export default function Schedule() {
  const [schedule, setSchedule] = useState<scheduleType[]>()
  const [streaming, setStreaming] = useState<showType[]>()

  useEffect(() => {
    getSchedule().then((response) => {
      setSchedule([...response])
    })
    getStreaming().then((response) => {
      console.log(response)
      setStreaming([...response])
    })
  }, [])


  return <div className={styles.main_container}>
    <Guide schedule={schedule} />
    <>
      <h3>Streaming</h3>
      {streaming ? <div className={styles.card_container}>{streaming.map(item => {
        return <Link href={`/${item.id}`} key={uuidv4()}><ShowCard show={item} /></Link>
      })}</div> : null
      }
    </>
  </div>
}