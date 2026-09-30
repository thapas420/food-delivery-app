const request = require('supertest');
const app = require('../src/app');

describe('Event Ticket Booking API', () => {

  test('GET /events returns available events', async () => {
    const res = await request(app).get('/events');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /book creates a ticket booking', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        eventId: 1,
        quantity: 2,
        customerName: 'Test User'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.total).toBe(1000);
  });

  test('POST /book with invalid event fails', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        eventId: 999,
        quantity: 1,
        customerName: 'Test User'
      });

    expect(res.statusCode).toBe(404);
  });

});