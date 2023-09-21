const express = require('express');
const router = express.Router();
const { Clothes } = require('../models/clothes');

// Define a route for creating a new clothes item. - sydney
router.post('/', async (req, res) => {
  try {
    const newClothes = await Clothes.create(req.body); // Creates a new clothes item using the Clothes model and the request body. - sydney
    res.status(201).json(newClothes); // Sends the new clothes item as a JSON object with a 201 status code. - sydney
  } catch (error) {
    res.status(400).json({ error: 'Failed to create clothes item.' });
  }
});

// Define a route for getting all clothes items. - sydney
router.get('/', async (req, res) => {
  try {
    const clothes = await Clothes.findAll(); // Finds all clothes items using the Clothes model. - sydney
    res.json(clothes); // Sends all clothes items as a JSON array. - sydney
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

// Define a route for getting a single clothes item. - sydney
router.get('/:id', async (req, res) => {
  try {
    const clothes = await Clothes.findByPk(req.params.id); // Finds a single clothes item by its primary key (id) using the Clothes model. - sydney
    if (clothes) {
      res.json(clothes); // if clothes exists, send it as a JSON object. - sydney
    } else {
      res.status(404).json({ error: 'Clothes not found.' }); // if clothes does not exist, send a 404 status code and an error message. - sydney
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

// Define a route for updating a single clothes item. - sydney
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Clothes.update(req.body, {
      where: { id: req.params.id },
    }); // Updates a single clothes item using the Clothes model and the request body. - sydney
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

// Define a route for deleting a single clothes item. - sydney
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Clothes.destroy({
      where: { id: req.params.id },
    }); // Deletes a single clothes item using the Clothes model and the request body. - sydney
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
