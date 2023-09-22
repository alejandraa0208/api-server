const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Collection = require('../models/collection');

const foodCollection = new Collection(Food);

router.post('/', async (req, res) => {
  try {
    const newFood = await foodCollection.create(req.body);
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create food item.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const foods = await foodCollection.readAll();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await foodCollection.readById(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedFood = await foodCollection.update(req.params.id, req.body);
    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await foodCollection.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

module.exports = router;

