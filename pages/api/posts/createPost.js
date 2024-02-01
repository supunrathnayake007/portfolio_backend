import { createAPost } from "../../../lib/mongodb";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function (req, res) {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "File upload failed " + err.message });
    }

    if (!req.file || !req.body.title) {
      return res.status(400).json({ error: "Missing file or title" });
    }
    try {
      const data = {
        image: req.file.buffer,
        title: req.body.title,
        desc: req.body.desc,
        user: req.body.user,
        date: Date.now(),
        published: true, //true for now, after user groups- validate if it published or not
      };
      const result = await createAPost(data);
      return res.status(200).json({ result: result });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  });
}
