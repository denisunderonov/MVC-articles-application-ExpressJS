const Article = require('../models/articleModel');

class ArticleController {
  async getAllArticles(req, res) {
    try {
      const articles = await Article.findAll();
      res.render('articles', { articles });
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getArticleById(req, res) {
    try {
      const article = await Article.findByPk(req.params.id);
      if (article) {
        res.render('article', { article });
      } else {
        res.status(404).send('Article not found');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }

  showNewArticleForm(req, res) {
    res.render('newArticle');
  }

  async createArticle(req, res) {
    try {
      const { title, text, author } = req.body;
      const newArticle = await Article.create({ title, text, author });
      res.redirect(`/articles/${newArticle.id}`);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new ArticleController();
