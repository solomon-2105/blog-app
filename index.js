import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const dataPath = path.join(__dirname, "posts.json");

// ---------- FILE HELPERS ----------

function getPosts() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function savePosts(posts) {
  fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
}

// ---------- ROUTES ----------

// HOME → Create form + show 2 recent blogs
app.get("/", (req, res) => {
  const posts = getPosts();
  const sorted = posts.sort((a, b) => b.id - a.id);
  const recentPosts = sorted.slice(0, 2);

  res.render("index", { recentPosts });
});

// ALL BLOGS PAGE
app.get("/blogs", (req, res) => {
  const posts = getPosts();
  const sorted = posts.sort((a, b) => b.id - a.id);

  res.render("blogs", { posts: sorted });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// CREATE
app.post("/create", (req, res) => {
  const posts = getPosts();

  posts.push({
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  });

  savePosts(posts);
  res.redirect("/");
});

// EDIT PAGE
app.get("/edit/:id", (req, res) => {
  const posts = getPosts();
  const post = posts.find(p => p.id == req.params.id);

  res.render("edit", { post });
});

// UPDATE
app.post("/update/:id", (req, res) => {
  const posts = getPosts();
  const post = posts.find(p => p.id == req.params.id);

  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }

  savePosts(posts);
  res.redirect("/blogs");
});

// DELETE
app.post("/delete/:id", (req, res) => {
  let posts = getPosts();
  posts = posts.filter(p => p.id != req.params.id);

  savePosts(posts);
  res.redirect("/blogs");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});