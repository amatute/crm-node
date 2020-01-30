const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        100,
        'A product name must have less or equal then 100 characters'
      ],
      minlength: [5, 'A product name must have more or equal then 5 characters']
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      require: [true, 'A product must have a category'],
      enum: {
        values: ['Galletas', 'Panes', 'Pasteles'],
        message: 'Castegorias: Galletas, Panes o Pasteles.'
      }
    },
    package: {
      type: String,
      trim: true
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A product must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    weight: {
      type: Number,
      default: 0
    },
    imageCover: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function(next) {
  this.start = Date.now();
  next();
});

productSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds ⏲`);
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
