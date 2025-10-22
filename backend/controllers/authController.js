import User from "../models/User.js";

// Login sederhana (tanpa hash)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    // Cari user
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Simpan session di server (atau kirim token)
    req.session.userId = user._id; // butuh express-session
    // ATAU kirim token (lebih sederhana untuk demo):
    res.status(200).json({ message: "Login berhasil", user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logout berhasil" });
  });
};