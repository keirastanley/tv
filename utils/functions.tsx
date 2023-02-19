import { RiStarLine, RiStarHalfFill, RiStarFill } from 'react-icons/ri'
import {v4 as uuidv4} from 'uuid'

export function Stars({rating} : {rating: number}){
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let stars = [];

  for (var i = rating; i >= 1; i--){
    stars.push(<RiStarFill/>);
  }

  if (i == .5) {
    stars.push(<RiStarHalfFill/>);
  } 

  for (let i = (5 - rating); i >= 1; i--) {
    stars.push(<RiStarLine/>);
  }
return <>{stars.map((star, ind) => <span key={uuidv4()}>{star}</span>)}</>
}