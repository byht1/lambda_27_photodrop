import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import colors from 'colors';
import * as dotenv from 'dotenv';

// yarn add -D colors
// npm i -D colors

dotenv.config();

(async () => {
  const DB_URL = process.env.DB_URL;
  try {
    if (!DB_URL) throw new Error('database connection data missing');

    const pool = new Pool({
      connectionString: DB_URL,
      ssl: true,
    });
    const db = drizzle(pool, { logger: true });

    console.log(colors.cyan('drizzle-orm migrate START'));

    await migrate(db, { migrationsFolder: `${__dirname}/migrations` });

    console.log(colors.green('drizzle-orm migrate FINISH'));
    process.exit(0);
  } catch (error) {
    console.log(colors.red('drizzle-orm migrate error \n'), error);
    process.exit(1);
  }
})();
