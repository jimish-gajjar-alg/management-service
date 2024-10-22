const amqplib = require('amqplib');

async function getOrderMessages() {
    try {
        // Connect to RabbitMQ
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = process.env.RABBITMQ_QUEUE || 'order_queue';

        // Assert that the queue exists
        await channel.assertQueue(queue, { durable: false });

        // Initialize an array to hold messages
        const messages = [];

        return new Promise((resolve, reject) => {
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const order = JSON.parse(msg.content.toString());
                    messages.push(order);
                    channel.ack(msg);
                }
            });

            // Timeout after 2 seconds if no messages are found
            setTimeout(() => {
                if (messages.length > 0) {
                    resolve(messages);
                } else {
                    reject(new Error('No messages found in the queue.'));
                }
            }, 2000);
        });
    } catch (error) {
        console.error('RabbitMQ Error:', error);
        throw error;
    }
}

module.exports = { getOrderMessages };
