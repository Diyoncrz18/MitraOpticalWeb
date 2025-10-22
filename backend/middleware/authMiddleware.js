// Middleware sederhana: cek apakah user login via token di localStorage
// Karena kita tidak pakai session, kita simpan user di req.user dari token

// Untuk demo, kita simpan user di memory (jangan lakukan di production!)
const validTokens = new Set();

// Simulasi login: simpan token
export const loginSimulator = (userId) => {
  const token = `token_${Date.now()}_${userId}`;
  validTokens.add(token);
  return token;
};

// Middleware untuk cek token
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Akses ditolak. Login dulu." });
  }

  const token = authHeader.split(" ")[1];
  if (!validTokens.has(token)) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  // Untuk demo, kita tidak verifikasi user, hanya cek token
  next();
};