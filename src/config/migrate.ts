import fs from 'fs';
import path from 'path';
import  pool  from './db';

const runMigrations = async () => {
  const dir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql'));

  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log('All migrations completed.');
  process.exit(0);
};

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
