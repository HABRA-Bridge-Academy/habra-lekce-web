const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
    public: { type: Boolean, default: false },
    title: { type: String },
    content: { type: mongoose.Schema.Types.Mixed },
    created: {
        type: Date,
        default: Date.now
    },
    meta: { type: mongoose.Schema.Types.Mixed }
}, { collection: 'articles' });

ArticleSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.__v
    obj.id = obj._id
    delete obj._id
    return obj
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;