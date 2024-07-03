// api-routes/sendContactFormEmail.js

import express from "express";
import sendContactFormEmailController from "../controllers/sendContactFormEmail.js";

const router = express.Router();

router.post("/", sendContactFormEmailController);

export default router;
