import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Untuk demo: kirim token sederhana
    const token = `token_${Date.now()}`;
    res.json({ message: "Login berhasil", token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;