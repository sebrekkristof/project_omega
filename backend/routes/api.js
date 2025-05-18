const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


router.post('/recipes', async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/recipes/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const recipe = await Recipe.findById(_id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/recipes/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const recipe = await Recipe.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/recipes/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const recipe = await Recipe.findByIdAndDelete(_id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.status(200).send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;