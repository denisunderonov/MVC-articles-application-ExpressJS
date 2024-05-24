const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.getAllArticles);
router.get("/new", articleController.showNewArticleForm);
router.post("/", articleController.createArticle);
router.get("/:id", articleController.getArticleById);
router.post("/delete/:id", articleController.deleteArticle);

module.exports = router;
