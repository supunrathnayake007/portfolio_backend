import { commonInsertMany } from "../../../lib/mongodb";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function (req, res) {
  try {
    upload.any("wallpaper")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "File upload failed " + err.message });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      try {
        // Parse formData parameters
        const fileFieldsCount = parseInt(req.body.fileFieldsCount);
        const userName = req.body.userName;

        const wallpapersData = req.files.map((file, index) => {
          return {
            file_name: Array.isArray(req.body.fileName)
              ? req.body.fileName[index]
              : req.body.fileName, // Get file name for each file
            file_data: file.buffer,
            created_date: new Date(),
            created_userName: userName || "YourUserName",
          };
        });

        const result = await commonInsertMany(wallpapersData, "wallpapers");
        if (result.error) {
          return res
            .status(500)
            .json({ error: result.error.message || "Internal server error" });
        }
        return res.status(200).json({ result });
      } catch (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ error: error.message || "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}
