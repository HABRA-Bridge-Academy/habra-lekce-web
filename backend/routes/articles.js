var express = require('express');
var router = express.Router();
module.exports = router;

const { body, param, validationResult } = require('express-validator');

const Article = require('../models/Article');
const { authorize } = require('../src/auth');

const idValidation = param('id').isMongoId().withMessage('Invalid ID format');
const titleValidation = body('title').not().isEmpty().withMessage('title-missing');
const contentValidation = body('content').not().isEmpty().withMessage('content-missing');

/* INDEX */
router.get('/', async function (req, res) {

    const user = req.user;
    let query = {
        public: true
    }
    if (user && user.role !== 'registered') query = {};

    const articles = await Article.find(query);
    res.json(articles);
});

/* GET */
router.get('/:id',
    idValidation,
    async function (req, res) {
        const article = await Article.findById(req.params.id);
        if (!article)
            return res.status(404).send('Article not found');
        if (article.canBeViewedBy(req.user))
            return res.json(article);

        return res.status(401);
    }
);
/* CREATE */
router.post('/',
    authorize('admin'),
    [
        titleValidation,
        contentValidation,
    ],
    async function (req, res) {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    }
);


/* UPDATE */
router.put('/:id',
    authorize('admin'),
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
    authorize('admin'),
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
