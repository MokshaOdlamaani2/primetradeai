const validator = require('validator');

// Replace this:
if (!isEmail(email)) {

// With this:
if (!validator.isEmail(email)) {
  return res.status(400).json({ msg: 'Invalid email address' });
}
