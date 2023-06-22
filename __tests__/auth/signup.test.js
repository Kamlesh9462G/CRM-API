const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Protected API Endpoint', () => {
  let authToken;

  beforeAll(async () => {
    // Connect to the MongoDB test database
    const mongoURI = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user
    const userPayload = {
      email: 'test@example.com',
      password: 'password123',
    };
    const user = await User.create(userPayload);

    // Generate a JWT token for the test user
    authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Delete the test user from the database
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  describe('GET /api/protected', () => {
    it('should return a success message for authenticated user', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.message).toBe('Access granted for authenticated user');
    });

    it('should return an error for unauthenticated user', async () => {
      const response = await request(app)
        .get('/api/protected')
        .expect(401);

      expect(response.body.error).toBe('Unauthorized');
    });
  });
});
