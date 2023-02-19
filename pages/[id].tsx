import { Stars } from "@/utils/functions";
import { castType, showType } from "@/utils/types";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"; import parse from 'html-react-parser';
import styles from '@/styles/show_page.module.css'
import { getCast, getShow } from "@/utils/requests";
import Cast from "@/components/cast";
import Info from "@/components/info";

export default function ShowPage() {
  const router = useRouter()
  const id = router.query.id;
  const [show, setShow] = useState<showType>()
  const [cast, setCast] = useState<castType[]>()

  useEffect(() => {
    if (id) {
      getShow(id as string).then((response) => setShow(response))
      getCast(id as string).then((response) => setCast(response))
    }
  }, [id])

  return <>{show ? <div className={styles.main_container}>
    <div className={styles.header}>
      <img src={show.image.medium}/>
      <div className={styles.main_details}>
        {show.rating.average ? <div className={styles.rating}><Stars rating={show.rating.average / 2} /> <p>{show.rating.average / 2}</p></div> : null}
        <h1>{show.name}</h1>
        <div className={styles.description}>{parse(show.summary)}</div>
      </div>
    </div>
    <div className={styles.more_details}>
      <Info show={show}/>
      {cast ? <Cast cast={cast}/> : null}
    </div>
  </div>
    : null}
  </>
}