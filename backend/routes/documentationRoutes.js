// backend/routes/documentationRoutes.js
import express from "express";
import {
  createDocumentation,
  getDocumentations,
  updateDocumentation,
  deleteDocumentation,
} from "../controllers/documentationController.js";

const router = express.Router();

// ❌ TIDAK ADA multer di sini!
router.post("/", createDocumentation);
router.get("/", getDocumentations);
router.put("/:id", updateDocumentation);
router.delete("/:id", deleteDocumentation);

export default router;