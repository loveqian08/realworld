const { body, param } = require('express-validator')
const validate = require('../middleware/validate')
const { Article } = require('../model')
const { MongoClient, ObjectId } = require('mongodb'); 
exports.createArticle = validate([
  body('article.title').notEmpty().withMessage('文章标题不能为空'),
  body('article.description').notEmpty().withMessage('文章摘要不能为空'),
  body('article.body').notEmpty().withMessage('文章内容不能为空')
])

exports.getArticle = validate([
  validate.isValidObjectId(['params'], 'articleId')
  // param('articleId').custom(async value => {
  //   if (!mongoose.isValidObjectId(value)) {
  //     // 返回一个失败状态的 Promise
  //     return Promise.reject('文章ID类型错误')
      
  //     // 同步：失败
  //     // throw new Error('文章ID类型错误')
  //   }
  //   // 同步：成功
  //   // return true
  // })
])

exports.updateArticle = [
  validate([
    validate.isValidObjectId(['body.article'], '_id')
    // param('articleId').isValidObjectId()
  ]),
  async (req, res, next) => {
    // const articleId = req.params.articleId;
    // const article = await Article.findById(articleId).populate('author');
    // req.article = article;
    // console.log("文章id222", article)
    const id = (req.body.article._id).replace(/\"/g, '');
      const article = await Article.findById(id).populate('author');
      req.article = article;
      console.log("文章 validate", article, id);
    if (!article) {
      return res.status(404).end()
    }
    next()
  },
  // async (req, res, next) => {
  //   if (req.user._id.toString() !== req.article.author.toString()) {
  //     return res.status(403).end()
  //   }
  //   next()
  // }
]

exports.deleteArticle = [
  validate([
    validate.isValidObjectId(['params'], 'articleId')
    // param('articleId').isValidObjectId()
  ]),
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId).populate('author');
    req.article = article;
    // const id = (req.params._id).replace(/\"/g, '');
    //   const article = await Article.findById(id).populate('author');
    //   req.article = article;
    //   console.log("文章 validate", article, id);
    if (!article) {
      return res.status(404).end()
    }
    next()
  },
  // async (req, res, next) => {
  //   if (req.user._id.toString() !== req.article.author.toString()) {
  //     return res.status(403).end()
  //   }
  //   next()
  // }
]
