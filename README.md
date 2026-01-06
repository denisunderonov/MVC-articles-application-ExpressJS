# Приложение для управления статьями (Express.js MVC)

Полнофункциональное веб-приложение для создания и управления статьями с авторами и комментариями. Реализовано по архитектуре MVC с использованием Express.js и Sequelize ORM.

## 🚀 Технологии

- **Express.js** - веб-фреймворк для Node.js
- **Sequelize** - ORM для работы с MySQL
- **MySQL2** - драйвер базы данных
- **EJS** - шаблонизатор
- **Body-Parser** - парсинг данных форм
- **Method-Override** - поддержка PUT/DELETE методов

## 🏗️ Архитектура MVC

### Models (Модели)
- **Article** - статьи (title, text, authorId)
- **Author** - авторы (name)
- **Comment** - комментарии (text, articleId)

### Controllers (Контроллеры)
- **articleController** - логика работы со статьями
- **authorController** - логика работы с авторами
- **commentController** - логика работы с комментариями

### Views (Представления)
- `articles.ejs` - список всех статей
- `article.ejs` - детальная страница статьи
- `newArticle.ejs` - форма создания статьи
- `editArticle.ejs` - форма редактирования
- `authors.ejs` - список авторов
- `authorArticles.ejs` - статьи конкретного автора
- `navbar.ejs` - навигационное меню

### Routes (Маршруты)
- `/articles` - работа со статьями
- `/authors` - работа с авторами
- `/comments` - работа с комментариями

## 📋 Функционал

### Статьи
- ✅ Просмотр всех статей
- ✅ Просмотр отдельной статьи с комментариями
- ✅ Создание новой статьи
- ✅ Редактирование статьи
- ✅ Удаление статьи

### Авторы
- ✅ Просмотр всех авторов
- ✅ Просмотр статей конкретного автора
- ✅ Создание автора при создании статьи

### Комментарии
- ✅ Добавление комментариев к статьям
- ✅ Удаление комментариев
- ✅ Отображение комментариев под статьями

## 🗄️ Структура базы данных

```sql
CREATE DATABASE project;

USE project;

-- Таблица авторов
CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблица статей
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  authorId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES authors(id) ON DELETE CASCADE
);

-- Таблица комментариев
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text TEXT NOT NULL,
  articleId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (articleId) REFERENCES articles(id) ON DELETE CASCADE
);
```

## 📁 Структура проекта

```
MVC-articles-application-ExpressJS/
├── config/
│   └── database.js           # Настройка Sequelize
├── controllers/
│   ├── articleController.js  # Контроллер статей
│   ├── authorController.js   # Контроллер авторов
│   └── commentController.js  # Контроллер комментариев
├── models/
│   ├── articleModel.js       # Модель статьи
│   ├── authorModel.js        # Модель автора
│   └── commentModel.js       # Модель комментария
├── routes/
│   ├── articleRoutes.js      # Маршруты статей
│   ├── authorRoutes.js       # Маршруты авторов
│   └── commentRoutes.js      # Маршруты комментариев
├── views/
│   ├── articles.ejs          # Список статей
│   ├── article.ejs           # Детальная страница
│   ├── newArticle.ejs        # Форма создания
│   ├── editArticle.ejs       # Форма редактирования
│   ├── authors.ejs           # Список авторов
│   ├── authorArticles.ejs    # Статьи автора
│   └── navbar.ejs            # Навигация
├── index.js                  # Точка входа
└── package.json              # Зависимости
```

## ⚙️ Установка и запуск

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/denisunderonov/MVC-articles-application-ExpressJS.git
cd MVC-articles-application-ExpressJS
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Настройте базу данных:**
- Создайте БД MySQL `project`
- Обновите `config/database.js`:
```javascript
const sequelize = new Sequelize('project', 'ваш_user', 'ваш_пароль', {
  host: 'localhost',
  dialect: 'mysql'
});
```

4. **Запустите приложение:**
```bash
npm start
```

5. **Откройте в браузере:**
```
http://localhost:4000/articles
```

Sequelize автоматически создаст таблицы при первом запуске.

## 🎯 Основные маршруты

- `GET /articles` - список всех статей
- `GET /articles/new` - форма создания статьи
- `POST /articles` - создание статьи
- `GET /articles/:id` - просмотр статьи
- `GET /articles/:id/edit` - форма редактирования
- `PUT /articles/:id` - обновление статьи
- `DELETE /articles/:id` - удаление статьи
- `GET /authors` - список авторов
- `GET /authors/:id` - статьи автора
- `POST /comments` - добавление комментария
- `DELETE /comments/:id` - удаление комментария

## 🎨 Особенности

- Полная реализация CRUD операций
- Связи между таблицами через Sequelize
- Server-side рендеринг с EJS
- Поддержка методов PUT/DELETE через forms
- Автоматическое создание таблиц
- Каскадное удаление связанных данных

---
*Автор: Денис Андронов*
