import { validationResult, matchedData } from "express-validator";
import DB from "./database.js"

const validation_result = validationResult.withDefaults({
    formatter: (error) => error.msg
})

class Controller {
    static validation = (req, res, next) => {
        const errors = validation_result(req).mapped()
        if(Object.keys(errors).length) {
            return res.status(422).json({
                ok: 0,
                status: 422,
                errors,
            })
        }
        next()
    }

    static posts = async (req, res, next) => {
        try {
            let sql = "SELECT * FROM `posts`"
            if (req.params.id) {
                sql = `SELECT * FROM posts WHERE id=${req.params.id}`
            }
            const [row] = await DB.query(sql)
            if(row.length === 0 && req.params.id) {
                return res.status(404).json({
                    ok: 0,
                    status: 404,
                    message: "Invalid post ID."
                })
            }
            const post = req.params.id ? {post:row[0]} : {posts: row}
            res.status(200).json({
                ok: 1,
                status: 200,
                ...post
            })
        }catch (e) {
            next(e)
        }
    }

    static create = async (req, res, next) => {
        const { title, body, author} = matchedData(req)
        try {
            const[result] = await DB.execute(
                "INSERT INTO `posts` (`title`,`content`,`author`) VALUES (?,?,?)",
                [title,body,author]
            )
            res.status(201).json({
                ok: 1,
                status: 201,
                message: "Post data has been created success",
                post_id: result.insertId
            })
        } catch (e) {
            next(e)
        }
    }

    static edit = async (req, res, next) => {
        try {
            const data = matchedData(req)
            const [row] = await DB.query("SELECT * FROM `posts` WHERE `id`=?", [
                data.post_id
            ])

            if(row.length !== 1) {
                return res.json({
                    ok:0,
                    status: 404,
                    message: "Invalid Post ID."
                })
            }
            const post = row[0]
            const date = new Date().toISOString()
            const title = data.title || post.title
            const content = data.body || post.content
            const author = data.author || post.author
            await DB.execute(
                "UPDATE `posts` SET `title`=?, `content`=?,`author`=?, `updated_at`=? WHERE `id`=?",
                [title, content, author, date, data.post_id]
            )
            res.json({
                ok: 1,
                status: 200,
                message: "Post Data Updated Successfully"
            })
        } catch(e) {
            next(e)
        }
    }
}

export default Controller