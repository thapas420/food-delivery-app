const express = require('express');

const app = express();

app.use(express.json());

const events = [
  {
    id: 1,
    name: 'Tech Conference 2026',
    date: '2026-10-15',
    venue: 'Kochi Convention Centre',
    price: 500
  },
  {
    id: 2,
    name: 'Music Festival 2026',
    date: '2026-11-05',
    venue: 'Marine Drive Ground',
    price: 750
  },
  {
    id: 3,
    name: 'Stand-up Comedy Night',
    date: '2026-11-20',
    venue: 'Town Hall Kochi',
    price: 300
  }
];

let bookings = [];

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Book tickets
app.post('/book', (req, res) => {
  const { eventId, quantity, customerName } = req.body;

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const booking = {
    bookingId: bookings.length + 1,
    event: event.name,
    customerName,
    quantity,
    total: event.price * quantity
  };

  bookings.push(booking);

  res.status(201).json(booking);
});

// Get all bookings
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

module.exports = app;