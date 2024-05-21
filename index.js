const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');
const sequelize = require('./config/database');
const Article = require('./models/articleModel');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов из articleRoutes
app.use('/articles', articleRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
