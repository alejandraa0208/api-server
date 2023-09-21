const express = require('express');
const router = express.Router();
const { Food } = require('../models/food');

router.post('/', async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create food item.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Food.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedFood = await Food.findByPk(req.params.id);
      res.json(updatedFood);
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Food.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
  
});

module.exports = router;
