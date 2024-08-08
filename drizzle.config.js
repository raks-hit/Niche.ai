/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://aidb_owner:lrs9Lp4ThzFu@ep-misty-rain-a19caupi.ap-southeast-1.aws.neon.tech/aidb?sslmode=require",
    }
  };