const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product }]
    });
    res.status(200).json(tagData);
  
  } catch (err) {
    console.error('Error fetching tags', err);
    res.status(500).json({message: 'Tags could not be retrieved successfully'});
  } 
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    // find the tag by its specific id and its associated products
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product }]
    });
    // if the tag is not found then send a 404 status with an error message
    if (!tagData){
      res.status(404).json({message: 'error, invalid tag by id search'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    // Error handling in the catch block, sending a 500 status with message
    res.status(500).json({message: 'error, could not find!'})
  }
  
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
