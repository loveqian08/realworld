const { Article } = require("../model")
const {  ObjectId } = require('mongodb'); 
exports.showIndex = async (req, res, next) => {
  try {
    const page = req.query.page
      ? Number.parseInt(req.query.page)
      : 1
    const pageSize = 10

    const articles = await Article.find()
      .skip((page - 1) * pageSize) // 跳过多少
      .limit(pageSize) // 取多少

    const articlesCount = await Article.count()

    res.render('index', {
      articles,
      page,
      pageSize,
      articlesCount,
      totalPage: Math.ceil(articlesCount / pageSize)
    })
  } catch (err) {
    next(err)
  }
}

exports.showEditor = async (req, res, next) => {
  try {
    
    if (req.params.articleId) {
      // const id = (req.params.articleId).replace(/\"/g, '');
      // let article = await Article.findById( id).populate('author');
      // article.tagList = ['vue', 'javascript']
      // req.article = article;
      // console.log("你会来到这里", article)
      // res.render('editor', {
      //   article
      // })
      const id = (req.params.articleId).replace(/\"/g, '');
      const article = await Article.findById(id).populate('author');
      article.tagList = ['vue', 'javascript']
      req.article = article;
      console.log("为什么你这么可以查到文章idwwww", article)
      res.render('editor', {
        article
      })
    } else {
      res.render('editor')
    }
  } catch (err) {
    next(err)
  }
}

exports.showArticle = async (req, res, next) => {
  try {
    const id = (req.params.articleId).replace(/\"/g, '');
    const article = await Article.findById(id).populate('author');
    console.log("为什么你这么可以查到文章id", article)
    res.render('article', {
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article({
      ...req.body.article,
      author: req.session.user._id
    })
    await article.save()
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err)
  }
}

exports.updateArtice = async(req, res, next) => {
  try {
    let article = req.article;
    // article.author = {
    //   bio: null,
    //   image: null,
    //   _id: ObjectId('629ca29fe9bb7dfb04d9899c'),
    //   username: 'chenming5',
    //   email: 'chenming5@qq.com',
    //   createdAt: '2022-06-04T10:36:16.968Z',
    //   updatedAt: '2022-06-04T10:36:16.968Z',
    //   __v: 0
    // }
    // article.author = ObjectId(article.author)
    // return false;
    // console.log("参数", article, req.body.article)
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.body = bodyArticle.body || article.body
    await article.save()
    console.log("文章", article)
    res.status(200).json({
      article
    })
  } catch (err) {
    next(err)
  }
}


// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article
    await article.remove()
    res.status(204).json({
      msg: 'sucess'
    })
  } catch (err) {
    next(err)
  }
}