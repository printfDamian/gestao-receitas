const express = require('express');
const router = express.Router();
const { verifyToken } = require('../auth/verifyToken');
const {
    createNewCollection,
    addToCollection,
    getCollections,
    getRecipesInCollection,
    removeFromCollection,
    getCollectionState,
} = require('../../controllers/collectionController');
const { removeCollection, updateCollection } = require('../../models/collectionModel');

router.post('/api/collections', verifyToken, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        const collectionId = await createNewCollection(userId, name);
        res.json({ id: collectionId, name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/api/collections/:id/recipes', verifyToken, async (req, res) => {
    try {
        const { recipeId } = req.body;
        await addToCollection(req.params.id, recipeId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/collections', verifyToken, async (req, res) => {
    try {
        const collections = await getCollections(req.userId);
        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/collections/:collectionId/recipes/:recipeId', verifyToken, async (req, res) => {
    try {
        const { collectionId, recipeId } = req.params;
        await removeFromCollection(collectionId, recipeId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/collections/state/:recipeId', verifyToken, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.userId;
        res.json({ 
            inCollection: await getCollectionState(userId, recipeId) 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/collections/:id', verifyToken, async (req, res) => {
    try {
        const collectionId = req.params.id;
        await removeCollection(collectionId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/api/collections/:id', verifyToken, async (req, res) => {
    try {
        const { name } = req.body;
        const collectionId = req.params.id;
        await updateCollection(collectionId, name);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;