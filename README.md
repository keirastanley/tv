# 📺 Neverbland.tv

A app that allows users to view an up-to-date TV guide, search for shows and save their favourites.

### 🪄Tech stack
- Next.js
- TypeScript
- Jest 
- Cypress

### Tests
The functions in /utils/functions.tsx are all tested using Jest. 

Run the unit tests

```bash
npm test
```

End-to-end testing has been implemented using Cypress to check that the main functionality performs as expected.

Run the end-to-end tests

```bash
npx cypress run
```

### 📝 Notes
- The data is pulled from [TV Maze's api](https://www.tvmaze.com/api), using the search, schedule and show endpoints.
- To demonstrate the favourites functionality without need of a database, favourited shows are stored in local storage. 