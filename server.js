const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

const stripe = Stripe(''); // Вставьте ваш Secret Key

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    const { items } = req.body; // Получаем данные о товарах из запроса клиента

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: { name: item.name },
                    unit_amount: item.amount, // Цена в центах
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'https://your-website.com/success', // Замените на ваш домен
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ id: session.id }); // Отправляем ID сессии клиенту
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
