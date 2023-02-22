import { removeDuplicateShows } from "./functions";

export async function getSchedule(dateObject: Date) {
  const date = new Date(dateObject).toISOString().slice(0, 10);
  const responseUS = await fetch(`https://api.tvmaze.com/schedule/?&date=${date}`);
  const dataUS = await responseUS.json();
  const responseUK = await fetch(`https://api.tvmaze.com/schedule/?&date=${date}&country=GB`);
  const dataUK = await responseUK.json()
  return dataUS.concat(dataUK);
};

export async function getStreaming() {
  const response = await fetch(`https://api.tvmaze.com/schedule/web?&country=GB`);
  const data = await response.json();
  const showData = await Promise.all(data.map(async (item: { _links: { show: { href: string; }; }; }) => {
    const response = await fetch(`${item._links.show.href}`);
    const data = await response.json();
    return data;
  }));
  return showData;
};

export async function getShow(id: string | number) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await response.json();
  console.log(data)
  return data;
};

export async function getShows(ids: string[] | number[]) {
  const data = await Promise.all(ids.map(async item => await getShow(item)));
  return data;
}

export async function getCast(id: string) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const data = await response.json();
  return data;
};

export async function getSearchResults(query: string) {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();
  const responsePlural = await fetch(`https://api.tvmaze.com/search/shows?q=${query}s`);
  const dataPlural = await responsePlural.json();
  return removeDuplicateShows(data.concat(dataPlural));
}