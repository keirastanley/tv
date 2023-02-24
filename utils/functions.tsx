import { guideType, scheduleType } from "./types";

/** Converts two date objects to the number of seconds they represent and returns the result of comparing them
 * @param d1 Date object
 * @param d2 Date object
 * @return boolean (true if objects represent the same date, false otherwise)
 */
export function compareDates(d1: any, d2: any) {
  return new Date(d1.toString().slice(0, 10)).getTime() === new Date(d2.toString().slice(0, 10)).getTime();
}

/** Returns a string displaying the current time, in HH:MM format
 * @param date Date object
 * @return string displaying only the time
 */
export function getCurrentTimeString(date: Date) {
  return date.toString().split(" ")[4].split(":").slice(0, 2).join(":");
}

/** Creates an array of each hour of the day in HH:MM format */
export function getTimes() {
  let times = [];

  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  return times;
}

/** Creates an object with hours as the properties and each showed aired within that hour as the values
 * @param schedule Array returned from getSchedule
 * @param times An array of each hour of the day in HH:MM format
 * @return An object (e.g. {"10:00": Object (scheduleType), "11:00": Object (scheduleType)})
 */
export function createGuideObj(schedule: scheduleType[], times: string[]) {
  let guideObj: { [key: string]: scheduleType[] } = {};
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
  return guideObj;
}

/** Takes in an array of guideType and returns it sorted by airtime
 * @param guide Array (guideType)
 * @return Array (guideType) sorted by time
 */
export function sortGuideByTime(guide: guideType[]) {
  //Sorts the array so the "time" properties are in order
  guide.sort((a, b) => Number(a.time.slice(0, 2)) - Number(b.time.slice(0, 2)));
  //Sorts the contents of the "shows" arrays 
  guide.map(item => item.shows.sort((a, b) => Number(a.airtime.slice(3)) - Number(b.airtime.slice(3))));
  return guide;
}

/** Takes a schedule array and returns an array of hours and the shows aired within those hours, sorted by airtime
 * @param schedule Array returned by calling getSchedule
 * @return Array of times and shows
 */
export function createGuide(schedule: scheduleType[]) {
  let guide: guideType[] = [];
  const times = getTimes();
  const guideObj = createGuideObj(schedule, times);

  for (const property in guideObj) {
    guide.push({ time: property, shows: guideObj[property] });
  }

  return sortGuideByTime(guide);
}

/** Gets the index which is used to determine from which point to display the guide array. This is used to ensure users only see shows that air during or after the time at which they are viewing the guide.
 * @param time The current time as a string
 * @param guide A guide object
 * @return Number, the index from which to display the guide array
 */
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

/** Determines the indexes to use for the 4 slices of the schedule array that are used as rows on the homepage
 * @param arrLength The length of the schedule array after calling getSchedule
 * @return An array of objects containing 2 indexes each to be mapped over in the Homepage component
 */
export function getHomepageIndexes(arrLength: number) {
  const lengthQuarter = arrLength / 4;
  const indexArr = [];
  for (let i = 0; i < 4; i++) {
    indexArr.push({ ind1: Math.floor(arrLength - (lengthQuarter * (4 - i))), ind2: Math.floor(arrLength - (lengthQuarter * (4 - (i + 1)))) })
  }
  return indexArr;
}

/** Removes any duplicate shows from a schedule array
 * @param arr Array returned when getSchedule is called
 * @return The array with any duplicated shows removed
 */
export function removeDuplicateShows(arr: scheduleType[]) {
  let ids: number[] = [];
  return arr.map(item => item.show).filter(item => {
    ids.push(item.id);
    return ids.indexOf(item.id) === ids.lastIndexOf(item.id)
  });
}