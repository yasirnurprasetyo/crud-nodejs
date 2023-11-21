import mysql from "mysql2"

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

export default connection.promise()