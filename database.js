import mysql from "mysql2"
import { config } from "dotenv"

const connection = () => {
    config()
    const {DB_HSOT, DB_NAME, DB_USER, DB_PASSWORD} = process.env
    return mysql.createPool({
        host: DB_HSOT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    })
}

export default connection.promise()