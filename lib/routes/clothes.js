const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');
const Collection = require('../models/collection');

const clothesCollection = new Collection(Clothes);

router.post('/', async (req, res) => {
  try {
    const newClothes = await clothesCollection.create(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create clothes item.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const clothes = await clothesCollection.readAll();
    res.json(clothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const clothes = await clothesCollection.readById(req.params.id);
    if (clothes) {
      res.json(clothes);
    } else {
      res.status(404).json({ error: 'Clothes not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedClothes = await clothesCollection.update(req.params.id, req.body);
    res.json(updatedClothes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await clothesCollection.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

module.exports = router;

