const { postSignup } = require('../Controllers/authRouter');
const userModel = require('../models/userModel');

const mongoose = require('mongoose');

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017', {
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


describe('postSignup function', () => {
  it('should create a new user and return a success message', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        confirmpassword: 'password',
      },
    };
    const res = {
      json: jest.fn(),
    };
    const userModelCreateSpy = jest.spyOn(userModel, 'create');
    await postSignup(req, res);
    expect(userModelCreateSpy).toHaveBeenCalledWith(req.body);

    expect(res.json).toHaveBeenCalledWith({
      message: 'user signed up',
      data: req.body,
    });
  });
});
