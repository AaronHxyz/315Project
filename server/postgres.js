const pg = require('pg');
const { Pool } = pg;
const env = process.env

const pool = new Pool({
    user: env.POSTGRES_USER,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT,
});

async function get(text, params) {
    const res = await pool.query(text, params);
    return res.rows;
}
async function getOne(text, params) {
    const res = await pool.query(text, params);
    return res.rows[0];
}
async function run(text, params) {
    const res = await pool.query(text, params);
    return res.rowCount;
}

module.exports = { get, getOne, run };
