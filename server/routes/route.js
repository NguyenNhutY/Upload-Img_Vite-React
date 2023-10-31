const router = require("express").Router();
const cloudinary = require("cloudinary").v2;

async function imageUplaoder(file) {
  const cloudinaryRes = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "DevChallenges",
    resource_type: "image",
    use_filename: true,
    unique_filename: true,
    filename_override: true,
  });
  return cloudinaryRes;
}
router.post("/uploadImage", async (req, res) => {
  try {
    // console.log(req.files)
    const file = req.files.imagevalue;
    if (!file) {
      return res.status(401).json({
        success: false,
        message: "file not found",
      });
    }
    const data = await imageUplaoder(file);
    return res.status(200).json({
      success: true,
      message: "image upload successfully",
      data: data,
    });
  } catch (error) {
    // console.log(error, "in catch");
    return res.status(200).json({
        success: false,
        message: error.message,
      });
  }
});

module.exports = router;
