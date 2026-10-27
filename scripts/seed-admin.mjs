/**
 * Creates the first admin user.
 *
 *   npm run seed:admin              create the admin if it doesn't exist
 *   npm run seed:admin -- --reset   also reset that admin's password
 *
 * Reads MONGODB_URI, MONGODB_DB, ADMIN_EMAIL and ADMIN_PASSWORD from
 * .env.local. If ADMIN_PASSWORD is empty, a random one is generated and
 * printed once. Change it after signing in (Admin → Password).
 */
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
let password = process.env.ADMIN_PASSWORD || "";
const reset = process.argv.includes("--reset");

if (!uri) {
  console.error("✗ MONGODB_URI is missing. Add it to .env.local first.");
  process.exit(1);
}
if (!email) {
  console.error("✗ ADMIN_EMAIL is missing. Add it to .env.local first.");
  process.exit(1);
}
let generated = false;
if (!password) {
  password = randomBytes(9).toString("base64url");
  generated = true;
} else if (password.length < 8) {
  console.error("✗ ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const users = client.db(process.env.MONGODB_DB || "goodbeginnings").collection("users");
  await users.createIndex({ email: 1 }, { unique: true });

  const existing = await users.findOne({ email });
  if (existing && !reset) {
    console.log(`• Admin ${email} already exists. Nothing changed.`);
    console.log("  To reset its password: npm run seed:admin -- --reset");
  } else {
    const now = new Date();
    const passwordHash = await bcrypt.hash(password, 12);
    if (existing) {
      await users.updateOne({ _id: existing._id }, { $set: { passwordHash, passwordChangedAt: now } });
      console.log(`✓ Password reset for ${email}.`);
    } else {
      await users.insertOne({
        email,
        name: "Admin",
        passwordHash,
        passwordChangedAt: now,
        createdAt: now,
      });
      console.log(`✓ Admin created: ${email}`);
    }
    if (generated) console.log(`  Password: ${password}   (shown once; change it after signing in)`);
    console.log("  Sign in at /admin");
  }
} catch (err) {
  console.error("✗ Could not seed the admin:", err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
