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
    // Error handling in the catch block, sending a 500 status with message
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
    // if the category is not found then send a 404 status with an error message
    if (!categoryData){
      res.status(404).json({message: 'error, invalid category by id search'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status with message
    res.status(500).json({message: 'error, could not find!'});
  }
});

// create a new category
router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json({newCategory});
  }catch (err){
    res.status(500).json(err, 'Check column name = category_name, Limit to create 1 category at a time')
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the corresponding ID using the data from req.body 
    const updated = await Category.update(req.body, { where: { id: req.params.id} });

    if (!updated[0]){
      res.status(404).json({message: 'id not found'});
      return;  
    }
    res.status(200).json(updated);
  } catch (err){
    res.status(500).json({message: 'Failed to update category'});
  }
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const deleted = await Category.destroy({ where: { id: req.params.id} });

    if (!deleted){
      res.status(404).json({message: 'id not found'});
      return;
    }
    res.status(200).json(deleted);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
