import express from "express";
import multer from "multer";
import {
  createDocumentation,
  getDocumentations,
  updateDocumentation,
  deleteDocumentation,
} from "../controllers/documentationController.js";

const router = express.Router();

// 🔹 Setup multer untuk upload sementara
const upload = multer({ dest: "uploads/" });

/* ===========================================================
   🟩 CREATE - Tambah dokumentasi baru
   Endpoint: POST /api/documentations
=========================================================== */
router.post("/", upload.single("image"), createDocumentation);

/* ===========================================================
   🟨 READ - Ambil semua dokumentasi
   Endpoint: GET /api/documentations
=========================================================== */
router.get("/", getDocumentations);

/* ===========================================================
   🟦 UPDATE - Edit dokumentasi berdasarkan ID
   Endpoint: PUT /api/documentations/:id
=========================================================== */
router.put("/:id", upload.single("image"), updateDocumentation);

/* ===========================================================
   🟥 DELETE - Hapus dokumentasi berdasarkan ID
   Endpoint: DELETE /api/documentations/:id
=========================================================== */
router.delete("/:id", deleteDocumentation);

export default router;
