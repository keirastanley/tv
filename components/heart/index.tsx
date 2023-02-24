import { showType } from '@/utils/types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from '@/styles/show_card.module.css';

type propsObj = {
  favourites: number[],
  handleFavourites: Function,
  show: showType,
  showPage?: boolean
}

/** Renders a heart symbol that can be clicked to add an item to your favourites or clicked again to remove it */
export default function Heart({ favourites, handleFavourites, show, showPage }: propsObj) {
  return <div onClick={() => handleFavourites(show.id)} data-cy="heart">
    {showPage ?
      favourites.includes(show.id) ?
        <AiFillHeart style={{
          color: "#e33b5f",
          fontSize: "30px"
        }} data-cy="heart_filled" /> :
        <AiOutlineHeart style={{ fontSize: "30px" }} data-cy="heart_outline" /> :
      favourites.includes(show.id) ?
        <AiFillHeart className={styles.heart_fill} data-cy="heart_filled" /> :
        <AiOutlineHeart className={styles.heart_outline} data-cy="heart_outline" />}
  </div>
}