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
  rating: { average: number | null },
  image: string | null,
  summary: string,
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
  runtime: number | null,
  averageRuntime: number,
  premiered: string,
  ended: string | null,
  officialSite: string,
  schedule: {
    time: string,
    days: string[]
  },
  rating: { average: number | null },
  weight: number,
  network: {
    id: number,
    name: string,
    country: {
      name: string,
      code: string,
      timezone: string
    },
    officialSite: string | null
  },
  webChannel: {
    id: number,
    name: string,
    country: {
      name: string,
      code: string,
      timezone: string
    },
    officialSite: string
  } | null,
  dvdCountry: string | null,
  externals: {
    tvrage: number | null,
    thetvdb: number | null,
    imdb: string | null
  },
  image: { medium: string | null, original: string | null },
  summary: string,
  updated: number,
  _links: {
    self: { href: string },
    previousepisode: { href: string },
    nextepisode?: { href: string }
  }
}

export type castType = {
  person:
  {
    id: number,
    url: string,
    name: string,
    country:
    {
      name: string,
      code: string,
      timezone: string
    },
    birthday: string,
    deathday: string | null,
    gender: string,
    image:
    {
      medium: string,
      original: string
    },
    updated: number
    _links:
    {
      self: {
        href: string
      }
    }
  },
  character:
  {
    id: number,
    url: string,
    name: string,
    image:
    {
      medium: string,
      original: string
    },
    _links:
    {
      self:
      {
        href: string
      }
    }
  },
  self: boolean,
  voice: boolean
}

export type guideType = {
  time: string;
  shows: scheduleType[];
}