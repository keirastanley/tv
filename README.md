# 📺 Neverbland.tv

A app that allows users to view an up-to-date TV guide, search for shows and save their favourites.

### 🪄Tech stack
- Next.js
- TypeScript
- Jest 

### 📝 Notes
- The data is pulled from [TV Maze's api](https://www.tvmaze.com/api), using the search, schedule and show endpoints.
- To demonstrate the favourites functionality without need of a database, favourited shows are stored in local storage. 

Run the project on localhost:

```bash
npm run dev
```

Run the unit tests

```bash
npm test
```