const router = require('express').Router();
const { Category, Product } = require('../../models');


// Get all Categories
// Handle GET requests to the '/' endpoint
router.get('/', async (req, res) => {
  try{
    // find all categories including the associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }catch(err){
    // Handle error by returning 404 : server cant find the reques & returns a message. 
    res.status(404).json({message: 'Category resource not found by server'});
  }
});

// Find one category by its `id` value
// Handle GET requests to the '/:id' endpoint
router.get('/:id', async (req, res) => {
  try{
    // find the category by its specific id and its associated products
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product }]
    });
    // if the category is not found then Handle error by returning 404 : server cant find the request & returns a message.
    if (!categoryData){
      res.status(404).json({message: 'Id resource not found by server'});
      return; // exit function early
    }
    res.status(200).json(categoryData);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status catch all with message
    res.status(500).json({message: 'error, could not find!'});
  }
});

// create a new category
// Handle GET requests to the '/' endpoint
router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json({newCategory});
  }catch (err){
    // Handle error by returning 400 : bad request & returns a message to try to fix . 
    res.status(400).json(err, 'Check column name = category_name, Limit to create 1 category at a time')
  }
});

// update a category by its `id` value
// Handle GET requests to the '/:id' endpoint
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the corresponding ID using the data from req.body 
    const updated = await Category.update(req.body, { where: { id: req.params.id} });

    // if the updated data is not found then Handle error by returning 404 : server cant find the request & returns a message.
    if (!updated[0]){
      res.status(404).json({message: 'id resource not found'});
      return; // exit function early
    }
    res.status(200).json(updated);
  } catch (err){
    // Error handling in the catch block, sending a 500 status catch all with message
    res.status(500).json({message: 'Failed to update category by id'});
  }
});


// delete a category by its `id` value
// Handle GET requests to the '/:id' endpoint
router.delete('/:id', async (req, res) => {
  try{
    const deleted = await Category.destroy({ where: { id: req.params.id} });

     // if deleted is not found then Handle error by returning 404 : server cant find the request & returns a message.
    if (!deleted){
      res.status(404).json({message: 'id resource not found'});
      return; // exit function early
    }
    res.status(200).json(deleted);
  } catch(err) {
    // Error handling in the catch block, sending a 500 status catch all with message
    res.status(500).json({message: 'Failed to delete category by id'});
  }
});

module.exports = router;
