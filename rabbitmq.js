const amqplib = require('amqplib');

async function getOrderMessages() {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const queue = 'order_queue';

        await channel.assertQueue(queue, { durable: false });

        return new Promise((resolve, reject) => {
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const order = JSON.parse(msg.content.toString());
                    channel.ack(msg);
                    resolve(order);
                } else {
                    reject('No messages in the queue.');
                }
            });
        });
    } catch (error) {
        console.error('RabbitMQ Error:', error);
        throw error;
    }
}

module.exports = { getOrderMessages };
