import { removeDuplicateShows } from "./functions";

/** Returns an array of shows airing on a given date
 * @param dateObject Date object
 * @return Array of shows (scheduleType[])
*/
export async function getSchedule(dateObject: Date) {
  const date = new Date(dateObject).toISOString().slice(0, 10);
  const responseUS = await fetch(`https://api.tvmaze.com/schedule/?&date=${date}`);
  const dataUS = await responseUS.json();
  const responseUK = await fetch(`https://api.tvmaze.com/schedule/?&date=${date}&country=GB`);
  const dataUK = await responseUK.json()
  return dataUS.concat(dataUK);
};

/** Gets the details of an individual show
 * @param id The id of the show
 * @return All primary information for the show corresponding to the given id
 */
export async function getShow(id: string | number) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await response.json();
  return data;
};

/** Gets the details of multiple shows by calling getShow on an array of ids
 * @param ids An array of ids
 * @return An array of shows matching the given ids
 */
export async function getShows(ids: string[] | number[]) {
  const data = await Promise.all(ids.map(async item => await getShow(item)));
  return data;
}

/** Gets the cast details for a given show
 * @param id The id of the show
 * @return An array containing each cast member's details
 */
export async function getCast(id: string) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const data = await response.json();
  return data;
};

/** Gets the results of making a search
 * @param query The search term
 * @return An array of results for the search
 */
export async function getSearchResults(query: string) {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();
  //An extra search is made for the term when pluralised as these were not included originally
  const responsePlural = await fetch(`https://api.tvmaze.com/search/shows?q=${query}s`);
  const dataPlural = await responsePlural.json();
  return removeDuplicateShows(data.concat(dataPlural));
}