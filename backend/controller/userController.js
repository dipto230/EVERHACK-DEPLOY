import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(currentUser);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res
      .status(500)
      .json({ message: `Get Current User error: ${error.message}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;

    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const updateFields = { name, description };
    if (photoUrl) updateFields.photoUrl = photoUrl;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("updateProfile error:", error);
    return res
      .status(500)
      .json({ message: `updateProfile error: ${error.message}` });
  }
};
