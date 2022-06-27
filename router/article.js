const express = require('express')
const articleCtrl = require('../controller/article')
const auth = require('../middleware/auth')
const articleValidator = require('../validator/article')

const router = express.Router()

router.get('/', articleCtrl.showIndex)

router.get('/editor', auth, articleCtrl.showEditor)

router.get('/editor/:articleId', auth, articleCtrl.showEditor)

router.put('/editor', auth, articleValidator.updateArticle, articleCtrl.updateArtice)

router.get('/article/:articleId',  auth,  articleCtrl.showArticle)

router.delete('/deleteArticle/:articleId',  auth,articleValidator.deleteArticle, articleCtrl.deleteArticle)

router.post('/articles', auth, articleValidator.createArticle, articleCtrl.createArticle)

module.exports = router;
