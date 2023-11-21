import { Router } from "express";
import { body, param } from "express-validator";
import Controller from "./controller.js"

const routes = Router({strict: true})

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

export default routes