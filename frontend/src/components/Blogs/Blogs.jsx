import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Shared/Heading";

const Blogs = () => {
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data dokumentasi dari backend
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/documentations");
        setDocumentations(res.data);
      } catch (error) {
        console.error("Gagal mengambil dokumentasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Memuat dokumentasi...
      </div>
    );
  }

  if (documentations.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Belum ada dokumentasi yang tersedia.
      </div>
    );
  }

  return (
    <div className="my-12" id="blogs">
      <div className="container">
        <Heading title="Dokumentasi" subtitle="MITRA OPTICAL" />

        {/* Grid dokumentasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
          {documentations.map((item) => (
            <div
              key={item._id}
              data-aos="fade-up"
              data-aos-delay={item.aosDelay || "0"}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Gambar */}
              <div className="overflow-hidden rounded-2xl mb-2">
                <img
                  src={item.imageUrl || item.image || "/default.jpg"}
                  alt={item.title}
                  className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                />
              </div>

              {/* Isi konten */}
              <div className="space-y-2 px-2 pb-3">
                <p className="text-xs text-gray-500">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <p className="font-bold line-clamp-1">
                  {item.title || "Tanpa Judul"}
                </p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {item.description || "Tidak ada deskripsi."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
