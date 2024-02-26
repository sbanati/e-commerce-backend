const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Find all products
// Handle GET requests to the '/' endpoint
router.get('/', async (req, res) => {
  try{
    // Find all products, and include associated categories and tags 
    const products = await Product.findAll({
      include: [{ model: Category}, { model: Tag}],
    });
    res.status(200).json(products);
  } catch (err) {
    // Handle error by returning 404 : server cant find the reques & returns a message.
    res.status(404).json({message: 'Product resource not found'});
  }
});

// Find a single product by its `id`
// Handle GET requests to the '/:id' endpoint
router.get('/:id', async (req, res) => {
  try {
    //find a product by its primary key (id) include associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}],
    });
    // if the product is not found then Handle error by returning 404 : server cant find the request & returns a message.
    if (!product){
      res.status(404).json({message: 'id resource not found for product'});
      return; // exit function early
    }
    res.status(200).json(product);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status catch all with message
    res.status(500).json({message: 'Failed to find product by id'});
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
// Handle GET requests to the '/:id' endpoint
router.delete('/:id', async (req, res) => {
  try{
    // Delete product by its `id` 
    const deleted = await Product.destroy({ where: { id: req.params.id}});
    // if deleted is not found then Handle error by returning 404 : server cant find the request & returns a message.
    if (!deleted){
      res.status(404).json({message: 'id resource not found'})
      return; // exit function early
    }
    res.status(200).json(deleted);
  
  } catch (err) {
    // Error handling in the catch block, sending a 500 status catch all with message
    res.status(500).json({message: 'Product delete failed', error: err});
  }  
});

module.exports = router;
