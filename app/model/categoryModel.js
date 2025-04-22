const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  }
});

// Auto-generate slug before saving
categorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
