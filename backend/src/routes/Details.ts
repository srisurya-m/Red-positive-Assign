import express from "express";
import { allInterface, createInterface, deleteInterface, mail, updateInterface } from "../controllers/Details.js";

const app = express.Router();

app.post("/create", createInterface );      // /api/v1/details/create
app.put("/:id", updateInterface );      // /api/v1/details/:id
app.delete("/:id", deleteInterface );      // /api/v1/details/:id
app.get("/all", allInterface );      // /api/v1/details/all
app.get("/mail/:id", mail );      // /api/v1/details/all

export default app;