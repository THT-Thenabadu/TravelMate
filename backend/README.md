# TravelMate Sri Lanka — Backend (Safety Panel)

Node.js / Express / MongoDB (Mongoose) API for the Solo-Traveler Safety Panel.
Matches the folder structure already used in the project:

```
backend/src
  config/       -> db.js (MongoDB connection)
  controllers/  -> request handlers
  data/         -> seedData.js + seeder.js (loads the JSON dataset into MongoDB)
  models/       -> Mongoose schemas
  routes/       -> Express routers
  app.js        -> Express app (middleware + route mounting)
  server.js     -> entry point
```

## 1. Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit MONGO_URI / PORT / CLIENT_ORIGIN as needed
```

Requires a running MongoDB instance (local `mongod` or a MongoDB Atlas connection string).

## 2. Seed the database

The existing `safetyTips.json` content has been split into three collections
(`safetytips`, `emergencynumbers`, `emergencyphrases`) in `src/data/seedData.js`.

```bash
npm run seed          # imports the data (clears the 3 collections first)
npm run seed:destroy   # wipes the 3 collections
```

## 3. Run the server

```bash
npm run dev    # nodemon, auto-restart
npm start      # plain node
```

Server boots on `http://localhost:5000` by default.

## 4. API Reference

### Combined endpoint (drop-in replacement for `safetyTips.json`)

| Method | Route                | Description                                                                 |
|--------|-----------------------|-------------------------------------------------------------------------------|
| GET    | `/api/safety-panel`  | Returns `{ emergencyNumbers, categories, safetyTips, emergencyPhrases }` shaped exactly like the current local JSON — swap `import safetyData from '../data/safetyTips.json'` for a `fetch('/api/safety-panel')` call and everything else in `SafetyPanel.jsx` keeps working. |

### Safety tips

| Method | Route                          | Description                                             |
|--------|----------------------------------|-----------------------------------------------------------|
| GET    | `/api/safety-tips`              | List tips. Query params: `category`, `riskLevel`, `search` |
| GET    | `/api/safety-tips/categories`   | Distinct category list (includes `"All"`)                |
| GET    | `/api/safety-tips/:tipId`       | Single tip                                                |
| POST   | `/api/safety-tips`              | Create a tip                                              |
| PUT    | `/api/safety-tips/:tipId`       | Update a tip                                              |
| DELETE | `/api/safety-tips/:tipId`       | Delete a tip                                              |

Example: `GET /api/safety-tips?category=Transport%20%26%20Scams&riskLevel=Critical&search=train`

### Emergency numbers

| Method | Route                                  | Description        |
|--------|-------------------------------------------|---------------------|
| GET    | `/api/emergency-numbers`                 | List, sorted by priority |
| POST   | `/api/emergency-numbers`                 | Create              |
| PUT    | `/api/emergency-numbers/:numberId`       | Update              |
| DELETE | `/api/emergency-numbers/:numberId`       | Delete              |

### Emergency phrases

| Method | Route                     | Description |
|--------|-----------------------------|--------------|
| GET    | `/api/emergency-phrases`   | List, in order |
| POST   | `/api/emergency-phrases`   | Create        |

### Health check

`GET /api/health` → `{ success: true, message: "TravelMate Sri Lanka API is running" }`

## 5. Wiring up the frontend

In `SafetyPanel.jsx`, replace the static import with a fetch, e.g.:

```jsx
const [data, setData] = useState(null);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/safety-panel`)
    .then((res) => res.json())
    .then((json) => setData(json.data));
}, []);
```

Add `VITE_API_URL=http://localhost:5000` to the frontend's `.env`, and the rest of
`SafetyPanel.jsx` (filtering, search, the modal) needs no changes — the payload
shape is identical to the current `safetyTips.json`.
