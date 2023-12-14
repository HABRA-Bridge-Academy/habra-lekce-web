var express = require('express');
var router = express.Router();
module.exports = router;

const { body, param, validationResult } = require('express-validator');

const Article = require('../models/Article');

const idValidation = param('id').isMongoId().withMessage('Invalid ID format');
const titleValidation = body('title').not().isEmpty().withMessage('title-missing');
const contentValidation = body('content').not().isEmpty().withMessage('content-missing');

/* INDEX */
router.get('/', async function (req, res, next) {
  try {
      const articles = await Article.find({});
      res.json(articles);
  } catch (error) {
      next(error);
  }
});

/* GET */
router.get('/:id', 
    idValidation,
    async function (req, res, next) {
        try {
            const article = await Article.findById(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            res.json(article);
        } catch (error) {
            next(error);
        }
    }
);
/* CREATE */
router.post('/', 
    [
        titleValidation,
        contentValidation,
    ],
    async function (req, res, next) {
        try {
            const newArticle = new Article(req.body);
            await newArticle.save();
            res.status(201).json(newArticle);
        } catch (error) {
            next(error);
        }
    }
);


/* UPDATE */
router.put('/:id', 
    [
        idValidation,
        titleValidation.optional(),
        contentValidation.optional(),
    ],
    async function (req, res, next) {
        try {
            const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedArticle) {
                return res.status(404).send('Article not found');
            }
            res.json(updatedArticle);
        } catch (error) {
            next(error);
        }
    }
);

/* DELETE */
router.delete('/:id', 
    idValidation,
    async function (req, res, next) {
        try {
            const article = await Article.findByIdAndDelete(req.params.id);
            if (!article) {
                return res.status(404).send('Article not found');
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);
