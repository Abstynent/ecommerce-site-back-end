const router = require('express').Router();
const { Category, Product } = require('../../models');
const notFoundMessage = { message: "No category found with that id!" };
// The `/api/categories` endpoint

// Get all categories with related Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Category by ID with related Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if(!categoryData) {
      res.status(404).json(notFoundMessage);
      return;
    } 

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add new Category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Category's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id }},
    );

    if(!categoryData) {
      res.status(404).json(notFoundMessage);
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete on Category by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if(!categoryData) {
      res.status(404).json(notFoundMessage);
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
