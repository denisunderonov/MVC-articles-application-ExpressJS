const Article = require("../models/articleModel");
const Author = require("../models/authorModel");
const Comment = require("../models/commentModel");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ include: [Author] });
    res.render("articles", { articles, title: "All Articles" });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: Author }, { model: Comment }],
    });
    if (article) {
      res.render("article", { article, title: article.title });
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.showNewArticleForm = (req, res) => {
  res.render("newArticle");
};

exports.createArticle = async (req, res) => {
  try {
    const { title, text, author } = req.body;
    let authorRecord = await Author.findOne({ where: { name: author } });
    if (!authorRecord) {
      authorRecord = await Author.create({ name: author });
    }
    const newArticle = await Article.create({
      title,
      text,
      authorId: authorRecord.id,
    });
    res.redirect(`/articles/${newArticle.id}`);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).send("Internal Server Error");
  }

};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    await Comment.destroy({ where: { articleId } });
    await Article.destroy({ where: { id: articleId } });
    res.status(200).redirect('/articles');
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};