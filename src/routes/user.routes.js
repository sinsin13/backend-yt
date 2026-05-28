import { Router } from "express";

const Router = Router();

Router.route("/register").post((req, res) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully"
    });
});

export default Router;