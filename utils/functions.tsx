import { guideType, scheduleType, showType } from "./types";

export function compareDates(d1: any, d2: any) {
  return new Date(d1.toString().slice(0, 10)).getTime() === new Date(d2.toString().slice(0, 10)).getTime();
}

export function createGuide(schedule: scheduleType[]) {
  let guide: guideType[] = [];
  let guideObj: { [key: string]: scheduleType[] } = {};
  let times = [];

  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  for (let i = 0; i < schedule.length; i++) {
    for (let j = 0; j < times.length; j++) {
      let timeNumber = Number(times[j].split(":")[0]);
      let airtimeNumber = Number(schedule[i].airtime.split(":")[0]);
      if (timeNumber === airtimeNumber) {
        if (guideObj[times[j]]) {
          guideObj[times[j]] = [...guideObj[times[j]], schedule[i]];
        }
        else {
          guideObj[times[j]] = [schedule[i]];
        }
      }
    }
  }

  for (const property in guideObj) {
    guide.push({ time: property, shows: guideObj[property] });
  }

  for (let i = 0; i < guide.length; i++) {
    guide[i].shows.sort((a, b) => Number(a.airtime.slice(3)) - Number(b.airtime.slice(3)))
  }

  return guide;
}

export function getIndex(time: string, guide: guideType[]) {
  let index = 0;
  for (let i = 0; i < guide.length; i++) {
    if (Number(time.split(":")[0]) <= Number(guide[i].time.split(":")[0])) {
      index = i;
      break;
    }
  }
  return index;
}

export function getHomepageIndexes(arrLength: number) {
  const scheduleLengthQuarter = arrLength / 4;
  const indexArr = [];
  for (let i = 0; i < 4; i++) {
    indexArr.push({ ind1: Math.floor(arrLength - (scheduleLengthQuarter * (4 - i))), ind2: Math.floor(arrLength - (scheduleLengthQuarter * (4 - (i + 1)))) })
  }
  return indexArr;
}

export function removeDuplicateShows(arr: scheduleType[]) {
  let ids: number[] = [];
  return arr.map(item => item.show).filter(item => {
    ids.push(item.id);
    return ids.indexOf(item.id) === ids.lastIndexOf(item.id)
  });
}