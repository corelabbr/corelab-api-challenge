import { db } from './connection';

async function test() {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log(rows);
    process.exit(0);
}

test();
