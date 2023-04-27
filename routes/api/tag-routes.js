const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const notFoundMessage = { message: "No tag found with that id!" };

// The `/api/tags` endpoint

// Get all tags including related Products
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!tagData) {
      res.status(404).json(notFoundMessage);
      return;
    };

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create new Tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id }},
    );

    if(!tagData) {
      res.status(404).json(notFoundMessage);
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if(!tagData) {
      res.status(404).json(notFoundMessage);
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
