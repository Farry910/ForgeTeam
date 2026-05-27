# Deploying ForgeTeam

ForgeTeam is a Next.js app backed by SQLite via Prisma. It deploys to any host
that can run a Node server from source. These notes target **free tiers** first,
per the roadmap.

## Production start path

```bash
npm ci
npx prisma generate
npm run build
npm run start:prod   # = prisma migrate deploy && next start
```

- `start:prod` applies migrations on boot, so a fresh host creates its schema
  automatically.
- `next start` binds to the `PORT` environment variable (hosts set this for you).
- Set `DATABASE_URL` for production, e.g. `file:./prod.db`.

## Render (Blueprint)

A [`render.yaml`](../render.yaml) Blueprint is included.

1. Push this repo to GitHub (already done).
2. In Render: **New → Blueprint**, point it at the repo, apply.
3. It builds with `npm ci && npx prisma generate && npm run build` and starts
   with `npm run start:prod`. `DATABASE_URL` is set to `file:./prod.db`.

## First-run data (optional)

The app works with an empty database (every page has an empty state). To load
the demo agents and tasks once, run a one-off command in the host's shell:

```bash
npm run db:seed
```

Don't put `db:seed` in the start command — the seed wipes and recreates data on
every run.

## ⚠️ SQLite persistence caveat

Free tiers usually have an **ephemeral filesystem**: the SQLite file is recreated
on every deploy/restart, so data does not persist. That's fine for a demo. For
durable data, either:

- attach a **persistent disk** and point `DATABASE_URL` at it
  (e.g. `file:/data/prod.db`) — usually a paid add-on, or
- migrate to a hosted **Postgres** later (change the Prisma `datasource`
  provider + `DATABASE_URL`). This matches the roadmap's "paid cloud later" note.

## Other hosts

- **Fly.io / Railway** — same idea: build with the commands above, start with
  `npm run start:prod`, set `DATABASE_URL`. Both can mount a volume for SQLite
  persistence.
- **Vercel** — not recommended for this app: its serverless filesystem is
  read-only/ephemeral and a long-lived SQLite file doesn't fit the model.

## Not included (deliberately)

No `Dockerfile` / `output: "standalone"` yet — those weren't build-tested in this
environment, and Prisma + standalone tracing has known footguns. Add them only
once they can be verified end to end.
