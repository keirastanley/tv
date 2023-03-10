# ๐บ Neverbland.tv

A app that allows users to view an up-to-date TV guide, search for shows and save their favourites.
[โจ Try it out โจ](https://neverblandtv.vercel.app)

### ๐ช Tech stack
- Next.js
- TypeScript
- Jest 
- Cypress

### ๐งช Tests
The functions in /utils/functions.tsx have all been tested using Jest. 

<i>Run the unit tests:</i>

```bash
npm test
```

End-to-end testing has been implemented using Cypress to check that the main functionality performs as expected.

<i>Run the end-to-end tests:</i>

```bash
npx cypress run
```

### ๐ Notes
- The data is pulled from [TV Maze's api](https://www.tvmaze.com/api), using the search, schedule and show endpoints.
- To demonstrate the favourites functionality without need of a database, favourited shows are stored in local storage. 