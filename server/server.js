// Importa el SDK de Stripe y usa la clave secreta en el lado del servidor
const stripe = require('stripe')('sk_test_51OvpUi2LHwPQKUjhMEjIA1lOIWwZsa5L64RuB86txCMuH8aH0TyFNUUom4p28lVg3TrG4tONyhSyB5dR2jOxkFFy00yOaQV2os');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
const YOUR_DOMAIN = 'http://localhost:4242';
app.use(cors());

// Ruta para manejar la creación de sesiones de pago
app.post('/checkout', async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty
    }
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [...items],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.status(200).json(session);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

// Ruta para consultar el estado de una sesión de pago
app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).json({ error: 'Error retrieving session status' });
  }
});

app.listen(4242, () => console.log('Running on port 4242'));
