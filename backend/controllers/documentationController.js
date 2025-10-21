// backend/controllers/documentationController.js
import Documentation from "../models/Documentation.js";

// ✅ CREATE
export const createDocumentation = async (req, res) => {
  try {
    const { title, description, imageUrl, publicId } = req.body;

    if (!title || !imageUrl || !publicId) {
      return res.status(400).json({
        message: "title, imageUrl, and publicId are required",
      });
    }

    const newDoc = new Documentation({
      title,
      description: description || "",
      imageUrl,
      publicId,
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (error) {
    console.error("Create Documentation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET ALL
export const getDocumentations = async (req, res) => {
  try {
    const docs = await Documentation.find().sort({ createdAt: -1 });
    res.status(200).json(docs);
  } catch (error) {
    console.error("Get Documentations Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE
export const updateDocumentation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, publicId } = req.body;

    if (!title || !imageUrl || !publicId) {
      return res.status(400).json({
        message: "title, imageUrl, and publicId are required",
      });
    }

    const updatedDoc = await Documentation.findByIdAndUpdate(
      id,
      { title, description, imageUrl, publicId },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Documentation not found" });
    }

    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Update Documentation Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ DELETE
export const deleteDocumentation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Documentation.findByIdAndDelete(id);

    if (!deletedDoc) {
      return res.status(404).json({ message: "Documentation not found" });
    }

    // Opsional: Hapus dari Cloudinary (jika butuh)
    // await cloudinary.uploader.destroy(deletedDoc.publicId);

    res.status(200).json({ message: "Documentation deleted successfully" });
  } catch (error) {
    console.error("Delete Documentation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};