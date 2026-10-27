import "server-only";
import { MongoClient, type Db } from "mongodb";

/**
 * One shared MongoDB connection per server process. In development the
 * client is kept on globalThis so hot reloads don't open a new connection
 * each time.
 */

type Cache = { client?: Promise<MongoClient>; indexes?: Promise<unknown> };
const cache = ((globalThis as { __gbMongo?: Cache }).__gbMongo ??= {});

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (and to Vercel's environment variables).",
    );
  }
  cache.client ??= new MongoClient(uri).connect().catch((err) => {
    cache.client = undefined; // let the next request retry
    throw err;
  });
  const db = (await cache.client).db(process.env.MONGODB_DB || "goodbeginnings");
  cache.indexes ??= ensureIndexes(db).catch(() => {
    cache.indexes = undefined;
  });
  await cache.indexes;
  return db;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("events").createIndex({ ts: 1 }),
    db.collection("events").createIndex({ type: 1, ts: 1 }),
    // Failed logins expire on their own after an hour.
    db
      .collection("login_attempts")
      .createIndex({ ts: 1 }, { expireAfterSeconds: 60 * 60 }),
  ]);
}

export type UserDoc = {
  email: string;
  name: string;
  passwordHash: string;
  /** Bumped on every password change; older sessions stop working. */
  passwordChangedAt: Date;
  createdAt: Date;
};

export type EventDoc = {
  type: "pageview" | "event";
  name?: string;
  label?: string;
  path: string;
  ts: Date;
  vid: string;
  sid: string;
  isNew?: boolean;
  landing?: boolean;
  source?: string;
  refDomain?: string;
  country: string;
  region: string;
  city: string;
  device: string;
  browser: string;
  os: string;
};
