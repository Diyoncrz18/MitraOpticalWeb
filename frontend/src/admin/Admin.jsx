import React, { useState } from "react";

const Admin = () => {
  // === STATE PRODUK ===
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Kacamata Aviator",
      price: 850000,
      img: "https://via.placeholder.com/360x280?text=Aviator",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    img: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // === STATE DOKUMENTASI ===
  const [docs, setDocs] = useState([
    {
      id: 1,
      title: "Cara Memilih Kacamata yang Tepat",
      subtitle:
        "Panduan lengkap memilih frame sesuai bentuk wajah dan kebutuhan penglihatan.",
      image: "https://via.placeholder.com/360x220?text=Dokumentasi+1",
    },
  ]);

  const [newDoc, setNewDoc] = useState({
    title: "",
    subtitle: "",
    image: "",
  });

  const [editingDoc, setEditingDoc] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);

  // --- PRODUK ---
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.img) {
      alert("Semua kolom produk wajib diisi!");
      return;
    }
    const product = {
      id: Date.now(),
      title: newProduct.title,
      price: Number(newProduct.price),
      img: newProduct.img,
    };
    setProducts([...products, product]);
    setNewProduct({ title: "", price: "", img: "" });
    setShowProductModal(false);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct.title || !editingProduct.price || !editingProduct.img) {
      alert("Semua kolom wajib diisi!");
      return;
    }
    setProducts(
      products.map((p) =>
        p.id === editingProduct.id
          ? { ...editingProduct, price: Number(editingProduct.price) }
          : p
      )
    );
    setEditingProduct(null);
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editingProduct && editingProduct.id === id) setEditingProduct(null);
  };

  // --- DOKUMENTASI ---
  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.subtitle || !newDoc.image) {
      alert("Semua kolom dokumentasi wajib diisi!");
      return;
    }
    const doc = {
      id: Date.now(),
      title: newDoc.title,
      subtitle: newDoc.subtitle,
      image: newDoc.image,
    };
    setDocs([...docs, doc]);
    setNewDoc({ title: "", subtitle: "", image: "" });
    setShowDocModal(false);
  };

  const handleUpdateDoc = (e) => {
    e.preventDefault();
    if (!editingDoc.title || !editingDoc.subtitle || !editingDoc.image) {
      alert("Semua kolom wajib diisi!");
      return;
    }
    setDocs(docs.map((d) => (d.id === editingDoc.id ? { ...editingDoc } : d)));
    setEditingDoc(null);
    setShowDocModal(false);
  };

  const handleDeleteDoc = (id) => {
    setDocs(docs.filter((d) => d.id !== id));
    if (editingDoc && editingDoc.id === id) setEditingDoc(null);
  };

  // Fungsi pembantu untuk membuka modal
  const openProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
      setNewProduct({ title: "", price: "", img: "" });
    }
    setShowProductModal(true);
  };

  const openDocModal = (doc = null) => {
    if (doc) {
      setEditingDoc(doc);
    } else {
      setEditingDoc(null);
      setNewDoc({ title: "", subtitle: "", image: "" });
    }
    setShowDocModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          Admin Panel - Mitra Optical
        </h1>

        {/* === BAGIAN PRODUK === */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Kelola Produk</h2>
            <button
              onClick={() => openProductModal()}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              + Tambah Produk
            </button>
          </div>

          {/* Daftar Produk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-primary font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openProductModal(product)}
                      className="text-blue-600 dark:text-blue-400 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 dark:text-red-400 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === BAGIAN DOKUMENTASI === */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Kelola Dokumentasi</h2>
            <button
              onClick={() => openDocModal()}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              + Tambah Dokumentasi
            </button>
          </div>

          {/* Daftar Dokumentasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow"
              >
                <div className="overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-[220px] object-cover hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="font-bold line-clamp-1">{doc.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {doc.subtitle}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openDocModal(doc)}
                      className="text-blue-600 dark:text-blue-400 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="text-red-600 dark:text-red-400 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === MODAL PRODUK === */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                </h3>
                <form
                  onSubmit={
                    editingProduct ? handleUpdateProduct : handleAddProduct
                  }
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={
                      editingProduct ? editingProduct.title : newProduct.title
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            title: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            title: e.target.value,
                          })
                    }
                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    placeholder="Harga (angka saja)"
                    value={
                      editingProduct ? editingProduct.price : newProduct.price
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                    }
                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (editingProduct) {
                            setEditingProduct({
                              ...editingProduct,
                              img: reader.result,
                            });
                          } else {
                            setNewProduct({
                              ...newProduct,
                              img: reader.result,
                            });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full dark:bg-gray-700"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
                    >
                      {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProductModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* === MODAL DOKUMENTASI === */}
        {showDocModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  {editingDoc ? "Edit Dokumentasi" : "Tambah Dokumentasi Baru"}
                </h3>
                <form
                  onSubmit={editingDoc ? handleUpdateDoc : handleAddDoc}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Judul"
                    value={editingDoc ? editingDoc.title : newDoc.title}
                    onChange={(e) =>
                      editingDoc
                        ? setEditingDoc({
                            ...editingDoc,
                            title: e.target.value,
                          })
                        : setNewDoc({ ...newDoc, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (editingDoc) {
                            setEditingDoc({
                              ...editingDoc,
                              image: reader.result,
                            });
                          } else {
                            setNewDoc({ ...newDoc, image: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full dark:bg-gray-700"
                  />
                  <textarea
                    placeholder="Deskripsi"
                    value={editingDoc ? editingDoc.subtitle : newDoc.subtitle}
                    onChange={(e) =>
                      editingDoc
                        ? setEditingDoc({
                            ...editingDoc,
                            subtitle: e.target.value,
                          })
                        : setNewDoc({ ...newDoc, subtitle: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
                    >
                      {editingDoc ? "Simpan Perubahan" : "Tambah Dokumentasi"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDocModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
