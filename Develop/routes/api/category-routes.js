const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Get all Categories
router.get('/', async (req, res) => {
  try{
    // find all categories including the associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json({message: 'Categories could not be retrieved successfully!'});
  }
});

// Get category by id
router.get('/:id', async (req, res) => {
// find one category by its `id` value
// be sure to include its associated Products
  try{
    // find the category by its specific id and its associated products
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product }]
    });
    // if the category is not found then sesnd a 404 status with an error message
    if (!Category){
      res.status(404).json({message: 'error, invalid category by id search'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status with message
    res.status(500).json({message: 'error, could not find!'});
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
