const express = require('express');
const router = express.Router();
const { getOrderMessages } = require('./rabbitmq');

// GET /orders - Retrieve orders from RabbitMQ
router.get('/orders', async (req, res) => {
    try {
        const orders = await getOrderMessages();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

module.exports = router;
