const express = require('express');
const { getOrderMessages } = require('./rabbitmq');
const router = express.Router();

router.get('/orders', async (req, res) => {
    try {
        const order = await getOrderMessages();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

module.exports = router;
