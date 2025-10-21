import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  // === PRODUK ===
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    imageFile: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // === DOKUMENTASI ===
  const [docs, setDocs] = useState([]);
  const [newDoc, setNewDoc] = useState({
    title: "",
    description: "",
    imageFile: null,
  });
  const [editingDoc, setEditingDoc] = useState(null);
  const [docPreview, setDocPreview] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const API_BASE = "http://localhost:5000/api";

  // 🔁 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, docRes] = await Promise.all([
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/documentations`),
        ]);
        setProducts(prodRes.data);
        setDocs(docRes.data);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoadingProducts(false);
        setLoadingDocs(false);
      }
    };
    fetchData();
  }, []);

  // 🔼 Upload image & return { url, publicId }
  const uploadImage = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return {
        url: res.data.url,
        publicId: res.data.publicId, // ✅ camelCase
      };
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Gagal mengunggah gambar. Coba lagi.");
      return null;
    }
  };

  // --- PRODUK ---
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.imageFile) {
      alert("Semua kolom produk wajib diisi!");
      return;
    }

    const imageResult = await uploadImage(newProduct.imageFile);
    if (!imageResult) return;

    try {
      const productData = {
        title: newProduct.title,
        price: Number(newProduct.price),
        imageUrl: imageResult.url,
        publicId: imageResult.publicId, // ✅ kirim publicId
      };
      const res = await axios.post(`${API_BASE}/products`, productData);
      setProducts([...products, res.data]);
      resetProductForm();
      setShowProductModal(false);
    } catch (err) {
      console.error("Gagal tambah produk:", err);
      alert("Gagal menambah produk. Cek konsol untuk detail.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct.title || !editingProduct.price) {
      alert("Judul dan harga wajib diisi!");
      return;
    }

    let imageUrl = editingProduct.imageUrl;
    let publicId = editingProduct.publicId;

    if (editingProduct.imageFile) {
      const imageResult = await uploadImage(editingProduct.imageFile);
      if (!imageResult) return;
      imageUrl = imageResult.url;
      publicId = imageResult.publicId;
    }

    try {
      const updatedData = {
        title: editingProduct.title,
        price: Number(editingProduct.price),
        imageUrl,
        publicId,
      };
      const res = await axios.put(
        `${API_BASE}/products/${editingProduct._id}`,
        updatedData
      );
      setProducts(
        products.map((p) => (p._id === editingProduct._id ? res.data : p))
      );
      resetProductForm();
      setShowProductModal(false);
    } catch (err) {
      console.error("Gagal update produk:", err);
      alert("Gagal memperbarui produk.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Yakin hapus produk ini?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Gagal hapus produk:", err);
      alert("Gagal menghapus produk.");
    }
  };

  // --- DOKUMENTASI ---
  const handleAddDoc = async (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.description || !newDoc.imageFile) {
      alert("Semua kolom dokumentasi wajib diisi!");
      return;
    }

    const imageResult = await uploadImage(newDoc.imageFile);
    if (!imageResult) return;

    try {
      const docData = {
        title: newDoc.title,
        description: newDoc.description,
        imageUrl: imageResult.url,
        publicId: imageResult.publicId, // ✅ wajib!
      };
      const res = await axios.post(`${API_BASE}/documentations`, docData);
      setDocs([...docs, res.data]);
      resetDocForm();
      setShowDocModal(false);
    } catch (err) {
      console.error("Gagal tambah dokumentasi:", err);
      alert("Gagal menambah dokumentasi. Cek konsol untuk detail.");
    }
  };

  const handleUpdateDoc = async (e) => {
    e.preventDefault();
    if (!editingDoc.title || !editingDoc.description) {
      alert("Judul dan deskripsi wajib diisi!");
      return;
    }

    let imageUrl = editingDoc.imageUrl;
    let publicId = editingDoc.publicId;

    if (editingDoc.imageFile) {
      const imageResult = await uploadImage(editingDoc.imageFile);
      if (!imageResult) return;
      imageUrl = imageResult.url;
      publicId = imageResult.publicId;
    }

    try {
      const updatedData = {
        title: editingDoc.title,
        description: editingDoc.description,
        imageUrl,
        publicId,
      };
      const res = await axios.put(
        `${API_BASE}/documentations/${editingDoc._id}`,
        updatedData
      );
      setDocs(docs.map((d) => (d._id === editingDoc._id ? res.data : d)));
      resetDocForm();
      setShowDocModal(false);
    } catch (err) {
      console.error("Gagal update dokumentasi:", err);
      alert("Gagal memperbarui dokumentasi.");
    }
  };

  const handleDeleteDoc = async (id) => {
    if (!window.confirm("Yakin hapus dokumentasi ini?")) return;
    try {
      await axios.delete(`${API_BASE}/documentations/${id}`);
      setDocs(docs.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Gagal hapus dokumentasi:", err);
      alert("Gagal menghapus dokumentasi.");
    }
  };

  // --- UTILS ---
  const resetProductForm = () => {
    setNewProduct({ title: "", price: "", imageFile: null });
    setEditingProduct(null);
    setProductPreview(null);
  };

  const resetDocForm = () => {
    setNewDoc({ title: "", description: "", imageFile: null });
    setEditingDoc(null);
    setDocPreview(null);
  };

  const openProductModal = (product = null) => {
    if (product) {
      setEditingProduct({ ...product, imageFile: null });
      setProductPreview(product.imageUrl);
    } else {
      resetProductForm();
    }
    setShowProductModal(true);
  };

  const openDocModal = (doc = null) => {
    if (doc) {
      setEditingDoc({ ...doc, imageFile: null });
      setDocPreview(doc.imageUrl);
    } else {
      resetDocForm();
    }
    setShowDocModal(true);
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (editingProduct) {
        setEditingProduct({ ...editingProduct, imageFile: file });
      } else {
        setNewProduct({ ...newProduct, imageFile: file });
      }
      setProductPreview(url);
    }
  };

  const handleDocImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (editingDoc) {
        setEditingDoc({ ...editingDoc, imageFile: file });
      } else {
        setNewDoc({ ...newDoc, imageFile: file });
      }
      setDocPreview(url);
    }
  };

  if (loadingProducts || loadingDocs) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white">
        <p className="text-lg">Memuat data admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          Admin Panel - Mitra Optical
        </h1>

        {/* PRODUK */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Kelola Produk</h2>
            <button
              onClick={() => openProductModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Tambah Produk
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-blue-600 font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
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
                      onClick={() => handleDeleteProduct(product._id)}
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

        {/* DOKUMENTASI */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Kelola Dokumentasi</h2>
            <button
              onClick={() => openDocModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Tambah Dokumentasi
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow"
              >
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="w-full h-[220px] object-cover hover:scale-105 duration-300"
                />
                <div className="p-4 space-y-2">
                  <p className="font-bold line-clamp-1">{doc.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {doc.description}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openDocModal(doc)}
                      className="text-blue-600 dark:text-blue-400 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc._id)}
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

        {/* MODAL PRODUK */}
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
                    value={editingProduct?.title || newProduct.title}
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
                    placeholder="Harga"
                    value={editingProduct?.price || newProduct.price}
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
                  <div>
                    <label className="block text-sm mb-1">Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      className="w-full text-sm"
                    />
                    {(productPreview ||
                      (editingProduct && editingProduct.imageUrl)) && (
                      <div className="mt-2">
                        <img
                          src={productPreview || editingProduct.imageUrl}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                      {editingProduct ? "Simpan" : "Tambah"}
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

        {/* MODAL DOKUMENTASI */}
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
                    value={editingDoc?.title || newDoc.title}
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
                  <textarea
                    placeholder="Deskripsi"
                    value={editingDoc?.description || newDoc.description}
                    onChange={(e) =>
                      editingDoc
                        ? setEditingDoc({
                            ...editingDoc,
                            description: e.target.value,
                          })
                        : setNewDoc({ ...newDoc, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div>
                    <label className="block text-sm mb-1">Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDocImageChange}
                      className="w-full text-sm"
                    />
                    {(docPreview || (editingDoc && editingDoc.imageUrl)) && (
                      <div className="mt-2">
                        <img
                          src={docPreview || editingDoc.imageUrl}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                      {editingDoc ? "Simpan" : "Tambah"}
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
