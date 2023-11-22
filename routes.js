import { Router } from "express";
import { body, param } from "express-validator";
import Controller from "./controller.js"

const routes = Router({strict: true})

// Read Data
routes.get(
    "/posts", Controller.posts
)
routes.get(
    "/post/:id",
    [param("id", "Invalid post ID.").exists().isNumeric().toInt()],
    Controller.validation,
    Controller.posts
)

// Create Data
routes.post(
    "/create",
    [
        body("title", "Must not be empty.").trim().not().isEmpty().escape(),
        body("body", "Must not be empty.").trim().not().isEmpty().escape(),
        body("author", "Must not be empty.").trim().not().isEmpty().escape(),
    ],
    Controller.validation,
    Controller.create
)

// Update Data
routes.put(
    "/edit",[
        body("post_id", "Invalid post ID").isNumeric().toInt(),
        body("title", "Must not be empty").optional().trim().not().isEmpty().escape(),
        body("body", "Must not be empty").optional().trim().not().isEmpty().escape(),
        body("author", "Must not be empty").optional().trim().not().isEmpty().escape(),
    ],
    Controller.validation,
    Controller.edit
)

// Delete Data
routes.delete(
    "/delete",
    [
        body("post_id", "Please provide a valid post ID.").exists().isNumeric().toInt()
    ],
    Controller.validation,
    Controller.delete
)

export default routes