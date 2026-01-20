const express = require('express');
const router = express.Router();
const Result = require('../models/Result');


router.post('/', async (req, res) => {
    try {
        const { quizId, userName, score, totalQuestions } = req.body;


        const result = await Result.findOneAndUpdate(
            { quizId, userName },
            {
                score,
                totalQuestions,
                date: Date.now()
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate('quizId', 'title');
        if (!result) return res.status(404).json({ error: 'Result not found' });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
