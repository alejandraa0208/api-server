const express = require('express');
const router = express.Router();
const { Food } = require('../models/food');

// Define a route for creating a new food item. - sydney
router.post('/', async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood); // Sends the new food item as a JSON object with a 201 status code. - sydney
  } catch (error) {
    res.status(400).json({ error: 'Failed to create food item.' });
  }
});

// Define a route for getting all food items. - sydney
router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll(); // Finds all food items using the Food model. - sydney
    res.json(foods); // Sends all food items as a JSON array. - sydney
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

// Define a route for getting a single food item. - sydney
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id); // Finds a single food item by its primary key (id) using the Food model. - sydney
    if (food) {
      res.json(food); // if food exists, send it as a JSON object. - sydney
    } else {
      res.status(404).json({ error: 'Food not found.' }); // if food does not exist, send a 404 status code and an error message. - sydney
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

// Define a route for updating a single food item. - sydney
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Food.update(req.body, {
      where: { id: req.params.id },
    }); // Updates a single food item using the Food model and the request body. - sydney
    if (updated) {
      const updatedFood = await Food.findByPk(req.params.id); // Finds a single food item by its primary key (id) using the Food model. - sydney
      res.json(updatedFood); // if food exists, send it as a JSON object. - sydney
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
});

// Define a route for deleting a single food item. - sydney
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Food.destroy({
      where: { id: req.params.id },
    }); // Deletes a single food item using the Food model and the request body. - sydney
    if (deleted) {
      res.status(204).send(); // Sends a 204 status code if the food item was deleted successfully. - sydney
    } else {
      res.status(404).json({ error: 'Food not found.' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error.', message: error.message });
  }
  
});

module.exports = router;
