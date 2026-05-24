## Tech Stack

- **React 17** + **TypeScript** (strict mode)
- **TanStack React Query** – server state & data fetching
- **React Router 5** – client-side routing
- **Feature-Sliced Design** – layer-based architecture (`app → pages → widgets → features → entities → shared`)

## Running locally

### With Docker (recommended)

Start the backend API and database:

```bash
docker-compose up
docker-compose run --rm api npm run db:reset  # first run only
```

Build and run the frontend:

```bash
docker build -t conduit-frontend .
docker run --rm -p 8080:80 conduit-frontend
```

App available at **http://localhost:8080**

### Without Docker

```bash
yarn install
yarn start
```

App available at **http://localhost:3000** (requires backend running separately on port 3000)

## Test credentials

| Email               | Password           |
|---------------------|--------------------|
| `alice@example.com` | `I_<3-R0ber7`      |
| `bob@example.com`   | `4L1ce-I5 mY_li3f` |

## Scripts

| Command       | Description                  |
|---------------|------------------------------|
| `yarn start`  | Start dev server             |
| `yarn test`   | Run tests in watch mode      |
| `yarn build`  | Production build             |
