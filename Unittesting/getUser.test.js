const { getUser } = require('../Controllers/userRouter');
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

// Disconnect from the test database
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('getUser function', () => {
  it('should return a list of users', async () => {
    const req = {};
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    await getUser(req, res);
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith([
      { name: "Aarav", id: 1, age: 22 },
      { name: "Diya", id: 2, age: 27 },
      { name: "Kavya", id: 3, age: 19 },
      { name: "Rahul", id: 4, age: 31 },
      { name: "Shreya", id: 5, age: 25 },
    ]);
  });

});
