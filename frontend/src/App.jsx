import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Category from "./components/Category/Category";
import Category2 from "./components/Category/Category2";
import Banner from "./components/Banner/Banner";
import Products from "./components/Products/Products";
import Admin from "./Admin/admin.jsx";
import Login from "./admin/Login.jsx"; // ✅ Import Login

import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import headphone from "./assets/hero/headphone.png";
import watch from "./assets/category/macbook.png";
import Blogs from "./components/Blogs/Blogs"; 
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Tambahkan Navigate

const BannerData = {
  discount: "Hemat 10%",
  title: "Ray Ban",
  date: "10 Jan - 28 Jan",
  image: headphone,
  title2: "Produk Terlaris",
  title3: "Penawaran Terbatas",
  title4:
    "Tampil keren dan percaya diri dengan koleksi terbaru kami. Belanja sekarang!",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "Hemat 20%",
  title: "Teg Heuer",
  date: "10 Jan - 28 Jan",
  image: watch,
  title2: "Produk Terlaris",
  title3: "Penawaran Terbatas",
  title4: "Tampil keren dan percaya diri bersama Mitra Optical!",
  bgColor: "#2dcc6f",
};

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [loginPopup, setLoginPopup] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    // Cek login saat pertama kali render
    return !!localStorage.getItem("token");
  });
  const [cartCount, setCartCount] = React.useState(0);
  const [cartItems, setCartItems] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [orderFormData, setOrderFormData] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  // Sinkronkan status login dengan localStorage
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleOrderPopup = (product = null) => {
    if (!isLoggedIn) {
      setLoginPopup(true);
      return;
    }

    if (product) {
      setSelectedProduct(product);
      setOrderFormData({ name: "", address: "", phone: "" });
      setOrderPopup(true);
    } else {
      setOrderPopup(!orderPopup);
    }
  };

  const handleLoginPopup = () => {
    if (!isLoggedIn) {
      setLoginPopup(true);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoginPopup(false);
    toast.success("Logged in successfully!");
  };

  // 🔐 Fungsi logout global (bisa dipanggil dari Admin)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
  };

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    setCartCount(cartCount + quantity);
    setShowCart(true);
    toast.success("Product added to cart!");
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (itemToRemove) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );
      setCartItems(updatedCartItems);
      setCartCount(cartCount - itemToRemove.quantity);

      if (updatedCartItems.length === 0) {
        setShowCart(false);
      }

      toast.info("Product removed from cart!");
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const { name, address, phone } = orderFormData;
    if (!name || !address || !phone) {
      toast.error("Semua kolom wajib diisi!");
      return;
    }

    console.log("Pesanan:", {
      product: selectedProduct,
      customer: orderFormData,
    });

    toast.success(`Pesanan untuk ${selectedProduct.title} berhasil dikirim!`);
    setOrderPopup(false);
    setSelectedProduct(null);
  };

  const handleCloseOrderPopup = () => {
    setOrderPopup(false);
    setSelectedProduct(null);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  // 🔒 Komponen pembungkus untuk route admin
  const ProtectedAdminRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <Admin onLogout={handleLogout} />;
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      {/* Hanya tampilkan Navbar di halaman publik */}
      {!window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/login") && (
        <Navbar
          handleLoginPopup={handleLoginPopup}
          isLoggedIn={isLoggedIn}
          cartCount={cartCount}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          showCart={showCart}
          setShowCart={setShowCart}
          orderPopup={orderPopup}
          setOrderPopup={setOrderPopup}
          handleOrderPopup={handleOrderPopup}
        />
      )}

      <Routes>
        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <>
              <Hero handleOrderPopup={handleOrderPopup} />
              <Category />
              <Category2 />
              <Banner data={BannerData} />
              <Products
                handleOrderPopup={handleOrderPopup}
                isLoggedIn={isLoggedIn}
                handleLoginPopup={handleLoginPopup}
                handleLogin={handleLogin}
                addToCart={addToCart}
              />
              <Banner data={BannerData2} />
              <Blogs />
              <Footer />
            </>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        {/* Admin (dilindungi) */}
        <Route path="/admin" element={<ProtectedAdminRoute />} />
      </Routes>

      {/* Popup Pemesanan */}
      {orderPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseOrderPopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Pesan: {selectedProduct.title}
            </h2>
            <form onSubmit={handleSubmitOrder}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={orderFormData.name}
                  onChange={(e) => setOrderFormData({ ...orderFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Alamat Lengkap</label>
                <textarea
                  value={orderFormData.address}
                  onChange={(e) => setOrderFormData({ ...orderFormData, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Masukkan alamat pengiriman"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  value={orderFormData.phone}
                  onChange={(e) => setOrderFormData({ ...orderFormData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Contoh: 081234567890"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Kirim Pesanan
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;