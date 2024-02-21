import { getDataPageVice, getDataCount } from "../../../lib/mongodb";
export default async function (req, res) {
  // Set CORS headers to allow requests from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    let result = {};
    let body;
    if (typeof req.body === "object" && !Array.isArray(req.body)) {
      body = req.body;
    } else {
      body = JSON.parse(req.body);
    }
    const action = body.action;
    if (action === "loadPosts") {
      const { dataPerPage, pageNumber, loadedDataCount } = body;
      const posts = await getDataPageVice("Posts", dataPerPage, pageNumber);
      const totalDataCount = await getDataCount("Posts");
      const noMorePosts = loadedDataCount >= totalDataCount ? true : false;

      result = { posts: posts, noMorePosts: noMorePosts };
    } else if (action === "create_posts") {
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
          result = await createAPost(data);
        } catch (error) {
          console.error("Error:", error);
          return res
            .status(500)
            .json({ error: error.message || "Internal server error" });
        }
      });
    } else if (action === "update_view_count") {
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("API|viewPosts|error:" + error.message);
    res.end(error.message);
  }
}
