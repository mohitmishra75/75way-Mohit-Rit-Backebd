import express, { Request, Response, Router } from "express";
import { func } from "../Controllers/func";

const router: Router = express.Router();

router.get("/", func);

export default router;
