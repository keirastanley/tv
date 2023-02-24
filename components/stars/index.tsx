import { RiStarLine, RiStarHalfFill, RiStarFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

/** Renders the correct number of fill, half and outline stars according to the show's numerical rating. */
export function Stars({ rating }: { rating: number }) {
  rating = Math.round(rating * 2) / 2;
  let stars = [];
  for (var i = rating; i >= 1; i--) {
    stars.push(<RiStarFill />);
  }
  if (i == .5) {
    stars.push(<RiStarHalfFill />);
  }
  for (let i = (5 - rating); i >= 1; i--) {
    stars.push(<RiStarLine />);
  }
  return <div>{stars.map(star => <span key={uuidv4()}>{star}</span>)}</div>
}