// const date = new Date().toISOString().slice(0, 10);

export async function getSchedule() {
  const response = await fetch(`https://api.tvmaze.com/schedule/?country=GB`);
  const data = await response.json();
  return data;
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

export async function getShow(id: string) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await response.json();
  return data;
};

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
  return data.concat(dataPlural);
}