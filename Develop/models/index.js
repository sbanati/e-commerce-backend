// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category, foreign key used to establish the relationship
Product.belongsTo(Category, {
  foreignKey: 'category_id'
  
})
// Categories has many Products, foreign key establishes the association

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete:'CASCADE',
})

/* Product belongToMany Tag (through ProductTag) 
 A product can belong to multiple tag and tag can be associated with multiple products
 through manages many-to-many associations */
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  onDelete: 'CASCADE',
})

/*Tags belongToMany Products (through ProductTag) 
A tag can belong to multiple product and product can be associated with multiple tag
ProductTag model acts as a through model to manage the many-to-many relationship */
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  }
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
