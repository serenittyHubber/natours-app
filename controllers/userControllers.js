const User = require('./../models/userModel');
const { catchAsync } = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  res.status(200).json({
    status: 'Success',
    data: {
      users,
    },
  });
});

exports.testRouting = (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    message: 'Foco',
  });
};
