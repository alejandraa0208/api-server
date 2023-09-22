const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');

router.post('/', async (req, res) => {
  try {
    const newClothes = await Clothes.create(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create clothes item.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clothes = await Clothes.findAll();
    res.json(clothes);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const clothes = await Clothes.findByPk(req.params.id);
    if (clothes) {
      res.json(clothes);
    } else {
      res.status(404).json({ error: 'Clothes not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Clothes.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedClothes = await Clothes.findByPk(req.params.id);
      res.json(updatedClothes);
    } else {
      res.status(404).json({ error: 'Clothes not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Clothes.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Clothes not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

module.exports = router;
