const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags
// Handle GET requests to the '/' endpoint
router.get('/', async (req, res) => {
  try {
    // Fetch all tags, including associated product data
    const tagData = await Tag.findAll({
      include: [{model: Product }]
    }); 
    // Respond with a 200 status code and the fetched tag data
    res.status(200).json(tagData);
  } catch (err) {
    // Respond with a 404 status code and an error message if fetching fails
    res.status(404).json({message: 'Tags could not be retrieved successfully'});
  } 
});


// Find a single tag by its `id` 
// Handle GET requests to the '/:id' endpoint 
router.get('/:id', async (req, res) => {
  try {
    // find the tag by its specific id and its associated products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product }]
    });
    // if the tag is not found then send a 404 status with an error message
    if (!tagData){
      res.status(404).json({message: 'error, invalid tag by id search'});
      return; // exit function early 
    }
    res.status(200).json(tagData);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status with message
    res.status(500).json({message: 'error, could not find!'})
  }
  
});


// create a new tag
// Handle POST requests to the '/' endpoint
router.post('/', async (req, res) => {
  try{
    // Create a new tag using the Tag model and request body
    const tagData = await Tag.create(req.body);
    // If Tag Creation is successful, respond with a 200 status code, success message, and created tagData
    res.status(200).json({ message: 'Tag created successfully', tagData });
  } catch (err) {
    // If an error occurs during tag creation, respond with a 400 status code and an error message
    res.status(400).json({ message: 'Failed to create new tag', error: err });
  }
});


// update a tag's name by its `id` value
// Handle PUT requests to the '/:id' endpoint
router.put('/:id', async (req, res) => {
  try {
     // Update a Tag's name by its `id` value using the data from req.body
     const updated = await Tag.update(req.body, {
       where: { id: req.params.id },
     });
     // Check if no rows were affected during the update (Tag not found)
     if (!updated[0]) {
       // Respond with a 404 status code and an error message
       res.status(404).json({ message: 'Cannot find the Tag with this id' });
       return; // exit function early 
      } 
      // If the update is successful, respond with a 200 status code and the updated data
      res.status(200).json(updated);
     
   } catch (err) {
     // If an error occurs during the update, respond with a 500 status code and an error message
     res.status(500).json({ message: 'Failed to update Tag', error: err });
   }
});



// Delete on tag by its `id` value
// Handle DELETE requests to the '/:id' endpoint
router.delete('/:id', async (req, res) => {
  try{
    // Delete a Tag with the specified id
    const deleted = await Tag.destroy({ where: {id: req.params.id}});
    
    // Check if no rows were affected during the deletion (Tag not found)
    if (!deleted) {
      // Respond with a 404 status code and an error message
      res.status(404).json({ message: 'Cannot find a Tag with this id'});
      return;
    }

    // If the deletion is successful, respond with a 200 status code and the number of rows deleted
    res.status(200).json(deleted);
  
  } catch (err) {
    // If an error occurs during the deletion, respond with a 500 status code and an error message
    res.status(500).json({message: 'Failed to delete Tag', error: err})
  }
});


module.exports = router;
