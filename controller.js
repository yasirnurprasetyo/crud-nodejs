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
}

export default Controller