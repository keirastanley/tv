export type scheduleType = {
  id: number,
  url: string,
  name: string,
  season: number,
  number: number,
  type: string,
  airdate: string,
  airtime: string, 
  airstamp: string, 
  runtime: number, 
  rating: { average: string | null }, 
  image: string | null, 
  summary: string | null, 
  show: showType,
  _links: { 
    self: { href: string }, 
    show: { href: string } 
  } 
}

export type showType = { 
  id: number, 
  url: string, 
  name: string, 
  type: string, 
  language: string, 
  genres: string[], 
  status: string, 
  runtime: number, 
  averageRuntime: number, 
  premiered: string, 
  ended: string | null, 
  officialSite: string, 
  schedule: { 
    time: string, 
    days: string[] 
  }, 
  rating: { average: string | null }, 
  weight: number, 
  network: { 
    id: number, 
    name: string, 
    country: { 
      name: string, 
      code: string, 
      timezone: string
    }, 
  officialSite: string 
  }, 
  webChannel: string | null, 
  dvdCountry: string | null, 
  externals: { 
    tvrage: string | null, 
    thetvdb: string | null, 
    imdb: string | null 
  }, 
  image: { medium: string, original: string }, 
  summary: HTMLElement, 
  updated: number, 
  _links: { 
    self: { href: string }, 
    previousepisode: { href: string }, 
    nextepisode: { href: string } 
  } 
}