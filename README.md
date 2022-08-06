# Who's That Pokémon?

A clone of the classic Pokémon Ad break, Who's That Pokémon!

This app is currently set to use Pokémon from Generation 1 to 4. To change that, set the max Pokédex number (`MAX_NATIONAL_DEX_ID`) in [`pokemon.ts`](src/server/router/pokemon.ts) and re-running `npm run db-fill`. Remember to check with [pokeapi.co](https://pokeapi.co/) to see up to what generation they support.

## Setup

1. Create a `.env` file following `.env.example`.

- The default `DATABASE_URL` in `.env.example` is setup to work with the `docker-compose.yml`.

2. Run `docker compose up` to start a MySQL instance.
3. Run `npm run db-init` to apply the database schema.
4. Run `npm run db-fill` to populate the database with Pokémon.
5. Run `npm run dev` to start a development server on `localhost:3000`

## Tech Stack

- [Next.js](https://nextjs.org/)
- [MySQL](https://www.mysql.com/) (hosted on [planetscale.com](https://planetscale.com/))
- [tRPC](https://trpc.io/)

This app was bootstrapped with [create-t3-app](https://github.com/t3-oss/create-t3-app).
